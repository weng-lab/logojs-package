# Why Krews?

## Tooling support

Since Krews is written in plain old Kotlin, you get access to the great IDEs and editors that already support it. 
We recommend [Intellij IDEA](https://www.jetbrains.com/idea/).

You can also use any build tools that support Kotlin. We recommend 
[Gradle](https://kotlinlang.org/docs/reference/using-gradle.html) or 
[Maven](https://kotlinlang.org/docs/reference/using-maven.html).

## Clean, Concise, and Powerful

Written using Kotlin's DSL capabilities, Krews applications are semi-declarative. This means they're laid out like 
simple configurations, but open to any amount of programmatic customization.

Because we also use standard Kotlin projects, Krews code can and should be split up and organized into intuitive file 
structures. See the [Boilerplate](https://github.com/weng-lab/krews-boilerplate) for an example of this.

## Docker Native

Docker containerization is not only supported, it is required. We do not support running workflow tasks outside 
containers. This means your workflows will *always* be as reproducible as possible and anyone who uses your 
workflow or even just your containers will not have to worry about installing or configuring anything.

## Cloud Native

Krews currently supports the [Google Genomics Pipelines API](https://cloud.google.com/genomics/) as a first 
class citizen. It was the first integration written, and support was not shoe-horned into a model that does not 
support it well. It will take full advantage of the Pipelines API's ability to create and use exactly the VM 
you need for every task. It can also group many small tasks to run together easily.

Not only that, but with the Pipelines API Krews can automatically create a "Master" VM, copy itself to the VM 
(via Google Cloud Storage), and run there completely. Logs for the master process and each krews task, Krews' state 
file (an SQLite file), run reports, and outputs will be automatically managed and organized in a manner that is 
easy to navigate and debug.