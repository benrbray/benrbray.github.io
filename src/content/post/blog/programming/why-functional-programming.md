---
title: Why Learn Functional Programming?
summary: In this post, I reflect on how learning Haskell has influenced the way I solve problems, even when programming with traditional imperative languages.
datePublished: 2024-07-23
tags: [functional-programming]
---

* JavaScript's non-monadic Promise
  * https://github.com/promises-aplus/promises-spec/issues/94#issuecomment-16176966
  * https://eighty-twenty.org/2024/01/24/more-pitfalls-of-js-promises

### Factoring Out Recursion

https://twanvl.nl/blog/haskell/traversing-syntax-trees

### Parse, Don't Validate

https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/

### Higher-Order Thinking

### Premature Abstraction is the Root of All Evil

### Tagless-Final

### Parametric Polymorphism

(we can enumerate all possible pure functions for a given signature)

a polymorphic type signature makes it clear what a function can do, as well as what it _cannot_ do

a function `[a] -> [a]` can rearrange, duplicate, or delete elements from the input list, but it _cannot_ peek inside an `a`

### Free Theorems

### Thinking with Holes

### Disposable ADTs

### Newtypes

### Effect Stacks

* early exit on errors
* focus on the happy path