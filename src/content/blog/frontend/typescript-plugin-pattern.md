---
title: User-Defined Plugins with TypeScript Declaration Merging
titleDisplay: User-Defined Plugins with&nbsp;TypeScript Declaration Merging
tags: [design-patterns]
tools: [typescript]
datePublished: 2024-7-12
priority: low
summary: TODO
---

In this post, I will explain how TypeScript package authors can use [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) to allow users to define their own well-typed plugins.

## The Problem

This pattern is useful for situations where:

* the library author wishes to empower users to extend the base functionality of the package with their own user-defined plugins

## The Plugin Pattern

### Library Authors

The library author exports a record type, initially empty, whose fields will be defined in **declaration files** plugin authors: 

```typescript
export type PluginConfigMap = {

}
```

### Plugin Authors

The author of `foo-plugin` can register their configuration types with a module declaration:

```typescript
declare module "library-name" {
  interface PluginConfigMap {
    "foo-plugin" : FooPluginConfig
  }
}
```

### End Users

Now, an end user of the library who imports the `foo-plugin` receives detailed type hints for the plugin configuration!


## Retrieving Plugins by Name

## Example: Extensible Markdown Syntax Trees with `mdast`

From `vfile`:

```typescript
/**
 * This map registers the type of the `data` key of a `VFile`.
 *
 * This type can be augmented to register custom `data` types.
 *
 * @example
 * declare module 'vfile' {
 *   interface DataMap {
 *     // `file.data.name` is typed as `string`
 *     name: string
 *   }
 * }
 */

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
export interface DataMap {}

/**
 * Custom information.
 *
 * Known attributes can be added to @see {@link DataMap}
 */
export type Data = Record<string, unknown> & Partial<DataMap>
```

## Example: User-Defined Plugins in `noteworthy`