---
title: Record Types, Row Polymorphism
summary: 'DESCRIPTION'
datePublished: '22 February 2025'

series:
  seriesId: breadcrumbs-type-safari
  seriesNumber: 5
---

## [Leijen 2005] Extensible Records with Scoped Labels

Explains how to extend a polymorphic type system such as Hindley Milner with record types, by:

* Defining a new notion of equality between monotypes
* Extending the unification algorithm to work with these new equalities

### Primitive Record Operations

Records have three basic operations:

* **Extension.** The syntax `{ l = e | r }` extends a record `r` with label `l` and value `e`.
  ```
  origin = { x = 0 | { y = 0 | {} } }
  ```
  To reduce the number of braces, we abbreviate a series of extensions using comma-separated fields, as is common in many programming languages:
  ```typescript
  origin = { x = 0, y = 0 }
  origin3 = { z = 0 | origin }
  named s r = { name = s | r }
  ```

* **Selection.** The selection expression `r.l` selects the value of label `l` from record `r`.
  ```typescript
  distance p = sqrt ((p.x * p.x) + (p.y * p.y))
  ```
  The `distance` function works for any record that contains an `x` and `y` field:
  ```typescript
  distance (named "2d" origin) + distance origin3
  ```

* **Restriction.** The restriction operation `r - l` removes label `l` from record `r`.

### Compound Record Operations

From the three primitive operations, we can define new ones:

* **Update.** Restriction followed by extension.
  ```typescript
  { l := x | r } === { l = x | r - l } // update
  ```
* **Rename.** Combines extension, selection, and restriction.
  ```typescript
  { l <- m | r } === { l = r.m | r - m } // rename
  ```

### Free Extension

The type system presented in this paper permits **free-extension**, meaning that records can be extended with duplicates of pre-existing labels:

```typescript
origin = { x = 0 , y = 0 }
{ x = 1 | origin } // ok!
```

Rather than overwriting the old value associated with the label, Leijen's type system keeps all previous fields, both in the value and in the type.  All other operations work on the _first_ matching label in the record, working from the outside in.

```typescript
{ x = 2, x = True}.x        // 2
{{ x = 2, x = True} - x }.x // True
```

This allows for a form of _scoping_ among duplicate labels.  Consumers of record values have access to the full history of values associated with each label.

### Types of Records

The type of a record will be a sequence of labeled types, called a **row**:

```haskell
type Point = { x :: Int, y :: Int }
```

A row is either empty, or an extension of a row:

* The **empty row** is written $\{ \}$
* The **extension** of row $r$ with label $l$ of type $\tau$ is written $\{ l :: \tau \mid r \}$

