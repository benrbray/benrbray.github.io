---
title: Implementing a CodeMirror Component in both SolidJS and React
titleDisplay: Implementing a <code>codemirror</code> Component in both <code>solid-js</code> and <code>react</code>
datePublished: 2024-06-02
tags: [frontend]
tools: [typescript]
summary: While I mostly use `react` at work, I tend to prefer `solid-js` for my personal projects because I find that the `solid-js` approach to reactive programming makes it much easier to interact with the outside world.  In this post, I demonstrate this difference by implementing a `codemirror` component in both frameworks.
---

## Design Constraints

* We wish to embed a third-party component which is entirely responsible for managing its own rendering & state.
* The third-party component is configurable
* We need to be able to dynamically reconfigure the component at runtime, but it is undesirable to 
* We need two-way communication between our reactive UI and the embedded third-party component.
  * We have UI controls
  * Some of our UI components display information which is owned by the third-party component

Examples of situations where these requirements arise:

* working with frameworks based on WebGL or Canvas frameworks
* embedding a rich text editor such as `codemirror` or `prosemirror`

## Model Problem:  A `codemirror` Component

Our `codemirror` component will support the following configuration:

* `lang`: the language to be used for syntax highlighting
* `errors`: a list of ranges indicating the location of a syntax error

We want to support the following:

* toggle buttons to change the editor language
* whenever the editor contents have changed (after a debounce period), send the editor contents to a different frontend component for additional processing
* a button which 

# A `react` Implementation

# A `solid-js` Implementation

# The Key Observation

In React, every reference to external mutable state... .  Writing correct `react` code requires a deep understanding of `react`'s execution model, and writing ordinary JavaScript code in a `react` component can lead to subtle bugs if one isn't careful.  Instead, one must write code in a JavaScript-like `react` DSL (`useCallback`, `useState`, etc.).

In SolidJS, *signals* are the basic reactive primitive, and (to an outside observer) behave no differently from ordinary JavaScript functions.  Since components are run exactly once under the `solid-js` reactive model, it is safe to p

# Conclusions

In my experience working on small- to medium-sized frontend projects,

* In my experience, converting a `react` to `solid-js` usually involves _deleting_ code rather than writing it, and results in a component which is usually simpler, more versatile, and easier to maintain.
* My projects outgrow `react`'s state management model rather quickly, requiring me to introduce extra state management solutions like `zustand` or MobX.
* The SolidJS execution model is easier to reason about

# See Also

Hacker News, [SolidJS Feels Like What I Always Wanted React to Be](https://news.ycombinator.com/item?id=30508524)
Ryan Carniato, [Building a Reactive Framework from Scratch](https://dev.to/ryansolid/building-a-reactive-library-from-scratch-1i0p)

See [@riehl2017:category] for more details.