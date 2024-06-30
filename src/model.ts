import type { CollectionEntry } from "astro:content";

export type SeriesData = {
  series: CollectionEntry<'series'>,
  activeSlug: CollectionEntry<'blog'>["slug"]
}