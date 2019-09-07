# Workflows

A "Workflow" is a directed acyclic graph consisting of "Tasks" glued together with publishers.

<div class="img-container">
    <img src="../img/krews_workflow.png" />
</div>

The following simple example contains two tasks.

```kotlin
import krews.core.*
import krews.file.*
import krews.run
import reactor.core.publisher.*

// Bootstrap
fun main(args: Array<String>) = run(sampleWorkflow, args)

// The application's workflow, named "sample-workflow"
val sampleWorkflow = workflow("sample-workflow") {
    // A simple flux of the integers 1 through 10
    val range = (1..10).toFlux()

    // A task that creates base64 files
    val base64Out = task<Int, File>("base64", range) {
        dockerImage = "alpine:3.8"
        output = OutputFile("base64/$input.b64")
        command =
            """
            mkdir -p /data/base64
            echo "Hello world number $$input!" | base64 > /data/base64/$input.b64
            """
    }
    
    // A task that zips files
    task<File, File>("gzip", base64Out) {
        dockerImage = "alpine:3.8"
        output = OutputFile("gzip/${input.filename()}.gz")
        command =
            """
            mkdir -p /data/gzip
            gzip /data/${input.path} > /data/gzip/${input.filename()}.gz
            """
    }
}
```

Let's break this down. 

The `main` function is the application entrypoint. All it does is call the Krews `run` function
which does all the heavy lifting, parsing command line arguments and running the application with different 
configurations. More on that [later](running_environments.md).

## Tasks

Tasks are objects that handle processing data using docker containers. They have an input publisher and 
output publisher. The Input publisher may be a Mono or Flux, but the output publisher is always a Flux.

If you read the Project Reactor Documentation, you may have noticed most operations described in terms of 
marble diagrams (See [Flux](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html) docs
for examples). Tasks can be conceptualized in a similar way.

<div class="img-container">
    <img src="../img/krews_task.png" />
</div>

Tasks operate on every item from an input publisher, process them, and turn them into outputs for the output flux.

Let's take another look at the tasks from the above workflow.
```kotlin
    val base64Out = task<Int, File>("base64", range) {
        // Everything in this scope is calculated per-input 
        dockerImage = "alpine:3.8"
        output = OutputFile("base64/$input.b64")
        command =
            """
            mkdir -p /data/base64
            echo "Hello world number $input!" | base64 > /data/base64/$input.b64
            """
    }
```

### Task Inputs and Outputs

Tasks are declared in Workflows using the `task` function. This function has two generic fields that we must provide 
with classes (The stuff in <>). The first represents the type of the Input and the second Represents the type 
for the output. These classes may include:

- Primitive types like Int, String, and Boolean
- Krews Files
- Collection classes like List, Set, and Map
- [Data Classes](https://kotlinlang.org/docs/reference/data-classes.html)
- Any combination of the above. For example, List of a data class objects.

It's a good idea to always use Data Classes, even if you're only wrapping single Files or values.

More on this below.

### Task Definitions

Tasks also require 2 fields, the name and the input publisher, and a builder function (everything in {}). 
This function runs for every element provider by the input publisher. This input element is available as the 
variable "input" in the function.

Within the function, you may set the following fields:

- dockerImage (Required): The name of the docker image the task will run with.
- dockerDataDir: The working directory that should contain input and output files.
- output (Required): The output object. (More on this below)
- command: The command that will be executed on the given docker image.
- env: a map of optional environment variables to run the docker container with.
- cpus: number of cpus required for each task run.
- memory: amount of memory required for each task run.
- diskSize: disk space required for each task run.
- time: time required for each task run.

## Files

!!! caution 
    Krews Files in this section refer to `File` classes in the package `krews.file` NOT `java.io`. 
    Make sure to import accordingly with:
    ```kotlin
    import krews.file.*
    ```

Krews `File` objects are references to files that will be moved in and out of containers and File Storage. This 
is accomplished by using them in task Input and Output types. This can happen 3 ways:

- as the types directly
```kotlin
task<File, File>("example", input) { /* ... */ }
```

- in Collection Types
```kotlin
task<List<File>, Map<String, File>>("example", input) { /* ... */ }
```

- as fields in Data Classes
```kotlin
data class MyTaskInput(fileA: File, fileB: File)
data class MyTaskOutput(fileX: File, fileY: File)

task<MyTaskInput, MyTaskOutput>("example", input) { /* ... */ }
```

Again, always using data classes for task inputs and outputs is a good idea.

### File Paths

Files contain a `path` field. This is a partial path (ie. `some-dir/file.txt`) that can be used to determine real 
file paths as the file gets copied to and from docker containers.

When referencing a file in a task docker container, use the `File.dockerPath` utility to get the real path inside 
docker. This path will be equal to `"${task.dockerDataDir}/${file.path}"`

Files also contain the following utility functions:

- parentDir(): gets the parent directory in the File's partial path if one exists. 
- filename(): gets the filename without parent directories.
- filenameNoExt(): gets the filename without extensions


### Input Files

In Krews, `InputFile` is a type of `File`. They refer to files that were not created by Krews workflows. Passing them
to tasks in input element will trigger copying the file into the task's docker container.
 
There are several implementation, and you can create your own.

- `LocalInputFile` refers to files on a locally accessible file system. For use with Local executor and files 
on NFS for Slurm Executor.
- `GSInputFile` refers to files in Google Cloud Storage. May be used with any executor as long as the machine 
running the task has permissions to access to it.

### Output Files

`OutputFile` is another implementation of `File`. These refer to files that are created by the Krews workflow. 

- They live in /outputs in your execution environment's working directory.
- Using OutputFiles in task inputs will trigger the file to be copied into the docker container.
- Using OutputFiles in task outputs will cause the file to be copied out of the docker container into /outputs. 

!!! important
    Make sure to create an OutputFile for every file you want to saved. Any file that is not in the output 
    object WILL NOT be saved to File Storage. 

## Params

Both workflows and tasks contain values that can be passed in from configuration files. We call these "Params."

Workflow params are passed into the workflow itself and task params are passed into each task function. 
Task functions run for each input, but the same task params are passed in each time.

Both types of params have a required generic type (again, the stuff in <>'s). This type just needs to be able to 
deserialize from our config. It's highly recommended that you use a data class for this as well. See the 
[configurations page](config.md) for more on this.

Here's what this looks like on our previous example:

```kotlin
import krews.core.*
import krews.file.*
import krews.run
import reactor.core.publisher.*

fun main(args: Array<String>) = run(sampleWorkflow, args)

// Now we're using our best practice of data classes for everything
data class SampleParams(val rangeMax: Int)

data class Base64Params(val msg: String)
data class Base64Input(val index: Int)
data class Base64Output(val base64File: File)

data class ZipParams(val filenamePrefix: String)
data class ZipInput(val base64File: File)
data class ZipOutput(val zipFile: File)

val sampleWorkflow = workflow("sample-workflow") {
    // Here's our workflow level params
    val params = params<SampleParams>()

    val base64In = (1..params.rangeMax).toFlux().map { Base64Input(it) }
    val base64Out = task<Base64Input, Base64Output>("base64", base64In) {
        // and here's our workflow level params
        val taskParams = taskParams<Base64Params>()

        dockerImage = "alpine:3.8"
        output = Base64Output(OutputFile("base64/${input.index}.b64"))
        command =
            """
            mkdir -p /data/base64
            echo "${taskParams.msg} ${input.index}!" | base64 > /data/base64/${input.index}.b64
            """
    }

    val zipIn = base64Out.map { ZipInput(it.base64File) }
    task<ZipInput, ZipOutput>("gzip", zipIn) {
        val taskParams = taskParams<ZipParams>()

        dockerImage = "alpine:3.8"
        output = ZipOutput(OutputFile("gzip/${input.base64File.filename()}.gz"))
        command =
            """
            mkdir -p /data/gzip
            gzip /data/${input.base64File.path} > /data/gzip/${taskParams.filenamePrefix}-${input.base64File.filename()}.gz
            """
    }
}
```

## Grouping

Sometimes jobs are so small and fast that we spend more time and compute power on the overhead than the job itself.
For example, on Google this means spinning up new VMs, downloading docker images, downloading large input files 
that may be needed across many task runs, and tracking and polling with Krews.

For cases like this, Krews allows you to "group" multiple runs from the same task together to be submitted as 
single jobs. This can be done via task level configuration. For example

```hocon
task.my-task {
    grouping = 5
}
```

This will submit "my-task" task runs in batches of 5. On Google this means that they will run sequentially on the 
same VM, in separate containers. On Slurm, this would mean running sequentially in the same SBatch job. For Local 
Docker Runs this setting is ignored.

## Code Organization

By now you might be thinking that our workflow is starting to look pretty busy, and as our workflow grows, 
this problem would only get worse.

Because this is an ordinary Kotlin project, we get to split our code up into multiple files. Here's how we 
recommend you do it.

<div class="img-container">
    <img alt="logo" src="../img/krews_code_org.png" />
</div>

Notice we've broken up our application into a top-level entrypoint file containing our workflow `App.kt`, and a file for 
each task in the task package.

Let's take a look at one of the tasks first.

**task/Base64.kt**
```kotlin
package task

import krews.core.*
import krews.file.*
import org.reactivestreams.Publisher
import reactor.core.publisher.Flux

data class Base64Params(val msg: String)
data class Base64Input(val index: Int)
data class Base64Output(val base64File: File)

fun WorkflowBuilder.base64Task(i: Publisher<Base64Input>): Flux<Base64Output> = 
        this.task("base64", i) {
    val taskParams = taskParams<Base64Params>()
    val msg = taskParams.msg
    val index = input.index

    dockerImage = "alpine:3.9"
    output = Base64Output(OutputFile("base64/$index.b64"))
    command =
        """
        mkdir -p /data/base64
        echo "$msg $index!" | base64 > /data/base64/$index.b64
        """
}
```

Now all our Base64 task related code is in one place. We've also used a 
[Kotlin Extension Function](https://kotlinlang.org/docs/reference/extensions.html) on a class called WorkflowBuilder 
with [Single-Expression Function Shorthand](https://kotlinlang.org/docs/reference/functions.html#single-expression-functions) 
for our task creation function itself. WorkflowBuilder the class used under-the-hood when you call the "workflow" 
function. This is just some syntax sugar that allows us to make our workflow look like this:

**App.kt**
```kotlin
import krews.core.*
import krews.run
import reactor.core.publisher.*
import task.*

fun main(args: Array<String>) = run(sampleWorkflow, args)

data class SampleParams(
    val rangeMax: Int
)

val sampleWorkflow = workflow("sample-workflow") {
    val params = params<SampleParams>()

    val base64In = (1..params.rangeMax).toFlux().map { Base64Input(it) }
    // Here's our base64Task call referencing our extension function
    val base64Out = base64Task(base64In)

    val zipIn = base64Out.map { ZipInput(it.base64File) }
    zipTask(zipIn)
}
```

Now our application file is just concerned with a higher level view of the workflow, what tasks are added 
and how they've been piped together.