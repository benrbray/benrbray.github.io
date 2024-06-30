declare namespace App {
  interface Locals {
    currentEntry: import("astro:content").CollectionEntry<"blog">|null
    currentSeries: import("./model").SeriesData|null;
  }
}