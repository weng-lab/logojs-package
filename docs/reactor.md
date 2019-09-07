# Reactor

[Project Reactor](https://projectreactor.io/) is a functional reactive programming library, consisting of 
"publishers" and "operations"

## Publishers, Fluxes, and Monos

A **Publisher** is just a higher level interface for both Fluxes and Monos. You can think of them as streams. 
They are more sophisticated than traditional streams, notably in operating by push *and* pull, but let's not 
worry about that for now.

A **Flux** is just a Publisher with multiple elements. We will mostly be dealing with these.

A **Mono** is just a Publisher with one element.

## Flux and Mono Creation

Fluxes and Monos can be created with the `toFlux()` and `toMono()` kotlin extension functions. More on that 
[here](https://projectreactor.io/docs/core/release/reference/#kotlin-extensions)

```kotlin
import reactor.core.publisher.*

val flux1 = listOf("a", "b", "c").toFlux()
```

## Operations

Operations are the *functional* part of *functional reactive programming*. Every Publisher has functions that 
transform it into one or more other publishers.

```kotlin
import reactor.core.publisher.*

val flux1 = listOf("a", "b", "c").toFlux()
val flux2 = flux1.map { "$it$it" } // "aa", "bb", "cc" 
```

There are *many* operators. A full list for Fluxes can be found 
[here](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html) and for Monos 
[here](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Mono.html).