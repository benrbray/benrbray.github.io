declare namespace App {
  interface Locals {
    currentEntry: import("astro:content").CollectionEntry<"post">|null
    currentSeries: import("./model").SeriesData|null;
  }
}