# Getting Started

## Using the Boilerplate (Recommended)

The fastest way to get started is to clone the [krews-boilerplate](https://github.com/weng-lab/krews-boilerplate). 
This is not only quick, but is set up using what we consider to be best practices.

The boilerplate README.md contains instructions on what you'll need to replace, as well as instructions 
on running and building.

## Creating a Project from Scratch

If you're an advanced user and would like to setup your own 
Krews Application project from scratch, start by setting up a Kotlin project.

Instructions on setting up Kotlin projects can be found [here](https://kotlinlang.org/docs/tutorials/getting-started.html).

### Installing Krews Dependency

You can get the Krews library using any Maven compatible build system

#### Gradle
```kotlin
dependencies {
    compile("io.krews", "krews", "0.7.0")
}
```

#### Maven
```xml
<dependency>
  <groupId>io.krews</groupId>
  <artifactId>krews</artifactId>
  <version>0.7.0</version>
</dependency>
```

### Building

We recommend that you build the application into an executable Jar.

On Gradle, this can be done using the [Shadow Plugin](https://imperceptiblethoughts.com/shadow/)

On Maven, this can be done using the [Shade Plugin](https://maven.apache.org/plugins/maven-shade-plugin/examples/executable-jar.html)

If you'd like to use your project as a library to be referenced in other projects / workflows, 
you'll need to also create a sources Jar.

Publishing your Jars to a Maven Repository like [Bintray](https://bintray.com) will give you a free (for open source) 
place to store your libraries and executables.
