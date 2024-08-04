---
title: Setting up a Personal Blog with Astro
datePublished: 2024/08/04
summary: TODO
---

## Markdown Extensions

* math
* citations

## Supporting Series

## Dynamic Components for MDX Pages

* table of contents is passed _down_ from the slug page
* but we want to be able to show an "introduction" section before the TOC appears

## Exposing Components to Posts in Content Collections

https://github.com/withastro/astro/issues/7761#issuecomment-2265685058

```
---
import TroublesomeComponent from './components/TroublesomeComponent.astro'

// other stuff

const { Content: PostContent } = await entry.render()
---

<PostContent components={{ TroublesomeComponent }} />
```

## Embedding JavaScript and WASM

## Support for Unpublished Pages