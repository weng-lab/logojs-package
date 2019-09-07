# Configuration

Krews requires configuration files to run. These files, along with command line arguments allow you to tweak *how*
your workflow runs without touching or building your Krews application. The application itself is more concerned 
with *what* runs. In this way it is a means of 
[separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns). 

Configurations cover things like execution environment settings and parallelism. They also cover special parameters 
that you set up in your Krews Application to pass in differently for each run. They allow you to provide your 
workflow to 3rd parties as an executable. The only thing your users would then need to worry about is creating 
a config.

Krews configuration files are written in a superset of JSON called 
[HOCON](https://github.com/lightbend/config/blob/master/HOCON.md). It's just JSON with some additional syntax sugar 
that helps keep it concise and readable. These files conventionally use the extension `.conf`.

There are two types of configurations, workflow scope and task scope.

## Workflow Configurations

Workflow scope configurations apply to the entire workflow. They live at the top level of your configuration documents.

### Common Workflow Configurations

The following are workflow configurations common for running against any execution environment.

config name | description | required | default
--- | --- | --- | ---
parallelism | The maximum number of tasks allowed to run concurrently. Set to an integer or "unlimited" | no | unlimited 
report-generation-delay | Delay (in seconds) between generating updated status reports | no | 60

**Example**

```hocon
parallelism = 10
report-generation-delay = 180
```

### Local Docker Execution Specific

name | description | required | default
--- | --- | --- | ---
local.docker | Docker client configurations. In most cases you should not need to set these. | no | *none*
local.docker.uri | URI of docker daemon | no | *none*
local.docker.certificates-path | Path to certificate for TLS enabled docker daemon | no | *none*
local.docker.connect-timeout | Timeout (in milliseconds) for connecting to docker daemon | no | 5000
local.docker.read-timeout | Timeout (in milliseconds) for reading data from docker daemon | no | 30000
local.docker.connection-pool-size | Connection pool size for docker client | no | 100

**Example**

```hocon
local {
    docker {
        uri = "localhost:1234"
        certificate-path = "~/my-path/my-cert.cert"
        connect-timeout = 10000
        read-timeout = 60000
        connection-pool-size = 200
    }
}
```

### Google Cloud Execution Specific

name | description | required | default
--- | --- | --- | ---
google.project-id | Google Cloud project ID | yes | *none*
google.regions | List of regions in which we're allow to create VMs | no | *none*
google.bucket | Google Cloud Storage bucket where we will be keeping our workflow files | yes | *none*
google.job-completion-poll-interval | Interval (in seconds) between checks for pipeline job completion | no | 10
google.log-upload-interval | Interval (in seconds) between  pipeline job log uploads to storage | no | 60

**Example**

```hocon
google {
    project-id = my-project
    regions = [us-east1, us-east2]
    bucket = my-bucket
    job-completion-poll-interval = 60
    log-upload-interval = 120
}
```

### Slurm Execution Specific

name | description | required | default
--- | --- | --- | ---
slurm.job-completion-poll-interval | Interval (in seconds) between checks for pipeline job completion | no | 10
slurm.ssh | Used to connect to Slurm head node to run sbatch jobs and poll job status. Enables running remote machines that can ssh to slurm head node with passwordless login | no | *none*
slurm.ssh.user | User for Slurm head node ssh | no | *none*
slurm.ssh.host | Slurm head node host name | no | *none*
slurm.ssh.port | Slurm head node ssh port | no | 22

**Example**

```hocon
slurm {
    job-completion-poll-interval = 30
    ssh {
        user = jbrooks
        host = slurm018
        port = 23
    }
}
```

## Task Configurations

Task scope configurations apply to only individual tasks. They live under special sections of your configuration files. 

```hocon
// task configs in this section apply to ALL tasks
task.default {
    //...
}

// task configs in this section apply to tasks with a name matching "my-task-name"
task.my-task-name {
    //...
}

// task configs in this section apply to tasks with a label matching "my-task-label"
task.my-task-label {
    //...
}
```

Some of these sections match our application tasks based on names and labels. These are based on fields 
you use when you create your tasks.

```kotlin
task<MyTaskInput>("my-task-name", "my-task-label", "my-other-task-label") { 
    // ... 
}
```

Note that these fields must be hyphenated-snake-case but names. Since labels are free-form string fields, if you use a 
string like "My Task.Name!", it will automatically be converted to deserialize from "my-task-name". It is recommended 
you make all task names and labels hyphenated-snake-case to match configurations.

Task configurations will be merged for each task before deserializing, so you could set one setting in `task.default`, 
one in `task.my-task-name`, and one in `task.my-task-label` they could all be passed into a task. 

### Common Task Configurations

name | description | required | default
--- | --- | --- | ---
parallelism | The maximum number of *this* task that can run concurrently. Set to an integer or "unlimited." | no | unlimited
grouping | The number of task runs that are submitted per job for this task. Not applicable to Local Docker Execution. | no | 1

**Example**

```hocon
task.my-task-name {
    parallelism = 10
    grouping = 5
}
```

### Google Cloud Execution Specific

name | description | required | default
--- | --- | --- | ---
google.machine-type | A native google compute engine machine type (See [here](https://cloud.google.com/compute/docs/machine-types) for complete list). If this is set, it's always used regardless of other configs. | no | *none*
google.machine-class | A class of machine. Useful for when you don't know the needed resources until runtime. Options are: standard, highmem, highcpu, ultramem, custom | no | *none*
google.cpus | Number of CPUs. Can be used to override the runtime value. | no | *none* 
google.mem | Amount of memory. Can be used to override the runtime value. | no | *none*
google.mem-per-cpu | An optional memory per cpu ratio used when you don't have both fields available and don't want to use a machine class. | no | *none*
google.disk-size | Disk capacity. Can be used to override the runtime value. | no | *none*
google.disk-type | Type of disk, HDD vs SSD. | no | hdd

*Please note most of these settings are mutually exclusive. For example, a machine-class is not needed if you have 
a machine-type set.

**Example**

```hocon
task.my-task-name {
    google {
        machine-type = n1-standard-2
        machine-class = standard
        cpus = 2
        mem = 8GB
        mem-per-cpu = 2GB
        disk-size = 1TB
        disk-type = ssd
    }
}
```

### Slurm Execution Specific

name | description | required | default
--- | --- | --- | ---
slurm.cpus | Number of cpus. Can be used to override the runtime value. | no | *none*
slurm.mem | Amount of memory. Can be used to override the runtime value. | no | *none*
slurm.time | Time limit on the run time for the job in minutes. | no | *none*
slurm.partition | SBatch partition to use. | no | *none*
slurm.sbatch-args | Additional sbatch args used with our sbatch commands to initiate jobs. See [reference](https://slurm.schedmd.com/sbatch.html). | no | *none*

**Example**

```hocon
task.my-task-name {
    slurm {
        cpus = 4
        mem = 16GB
        time = 120
        partition = my-partition
        sbatch-args = "--nodes=2 --overcommit -priority=TOP"
    }
}
```

## Parameters

As mentioned in the workflows section, workflows and tasks have parameters customized in your application that get 
injected from configuration files. These are registered in your application as classes.

The process of turning JSON (and HOCON) into objects of these classes is called deserialization. We do this 
using the [Jackson](https://github.com/FasterXML/jackson) library.

### Workflow Parameters

If your workflow contains the following

```kotlin
data class SampleParams(
    val message: String,
    // The ? means this is optional and will be null by default
    val flag: Boolean?,
    // This has a default value of 10, so we don't actually need to set it in our config
    val rangeMax: Int = 10
)

val sampleWorkflow = workflow("sample-workflow") {
    val params = params<SampleParams>()
    //...
}
```

You will be able to inject the following as parameters

```hocon
params {
    message = "Hello World!"
    range-max = 5
}
```

Notice that the `rangeMax` data class field was automatically converted to a hyphenated-snake-case version `range-max`. 
This will happen for all params.

### Task Parameters

Just like for workflows, we have custom parameters that can be injected into each task.

```kotlin
data class MyTaskParams(val someSetting: Boolean)

task<MyTaskInput>("my-task-name", "my-task-label", "my-other-task-label") {
    val taskParams = taskParams<MyTaskParams>
    //...
}
```

```hocon
task.my-task-name {
    params {
        some-setting = true
    }
}
```

### Ambiguity in Deserialization

For abstract classes and interfaces, we have special considerations in deserialization. Consider the following:

```kotlin
// In model/Pet.kt
interface Pet
data class Dog(val barkVolume: Int) : Pet
data class Cat(val meowVolume: Int) : Pet

// In App.kt
data class SampleParams(val pet: Pet)

val sampleWorkflow = workflow("sample-workflow") {
    val params = params<SampleParams>()
    //...
}
```

Since the `pet` parameter in HOCON is a type that is not concrete, Krews allows you to provide the concrete type.

```hocon
params {
    pet {
        -type = "model.Dog"
        bark-volume = 50
    }
}
``` 

### Input Files as Parameters

One of the most common uses of params is to provide files for each run. These files will be provided as InputFiles. 
The InputFile class is abstract, so when we pass them in we need to pass in implementations like GSInputFile for 
files in Google Cloud Storage and LocalInputFile for files on your local file system.

Here's an example params for a list of InputFiles

```kotlin
data class SampleParams(val myFiles: List<InputFile>)

val sampleWorkflow = workflow("sample-workflow") {
    val params = params<SampleParams>()
    //...
}
```

```hocon
params {
    my-files = [
        {
            -type = "krews.file.GSInputFile"
            bucket = "my-bucket"
            object-path = "some/object/path/file1.tar"
            path = "path/file1.tar"
        },
        {
            -type = "krews.file.GSInputFile"
            bucket = "my-bucket"
            object-path = "some/object/path/file2.tar"
            path = "path/file2.tar"
        }
    ]
}
```