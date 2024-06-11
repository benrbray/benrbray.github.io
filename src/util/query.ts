import { getCollection, type CollectionEntry } from "astro:content";
import { asyncMap } from "./async";

export const getSeriesPosts = async (series: CollectionEntry<"series">) => {
  const posts = await getCollection("blog", ({ data }) => {
    if(!data.series) { return false; }
    return data.series.seriesName.slug == series.slug;
  });

	return posts;
}