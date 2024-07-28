import { getCollection, type CollectionEntry } from "astro:content";
import { asyncFilter } from "./async";

export const IS_PROD = import.meta.env.PROD;
export const IS_DEV  = import.meta.env.DEV;

/* -------------------------------------------------------------------------- */

/**
 * Normalizes the URL for a given post, so that the `content/`
 * folder can be freely reorganized without breaking URLs.
 */
export const shortenProjectSlug = (slug: string) => {
    const prefix = "projects/";
    if(slug.startsWith(prefix)) {
      return slug.slice(prefix.length);
    } else {
      return slug;
    }
  }

/**
 * Computes the URL for a given post, so that the `content/`
 * folder can be freely reorganized without breaking URLs.
 */
export const getPostUrl = (post: CollectionEntry<"blog">) => {
  // some posts explicitly provide a URL, for
  // example when linking to a static PDF file
  if(post.data.url) {
    return post.data.url;
  }

  if(post.data.kind === "project") {
    return `/projects/${shortenProjectSlug(post.slug)}`;
  } else {
    return `/blog/${post.slug}`;
  }
}

export const postIsPublished = (post: CollectionEntry<"blog">) => {
  return post.data.published;
}

export const postDisplayTitle = (post: CollectionEntry<"blog">) => {
  return post.data.titleDisplay || post.data.title;
}

/* ---- series -------------------------------------------------------------- */

export const seriesIsPublished = async (series: CollectionEntry<"series">): Promise<boolean> => {
  const entries = await getSeriesPosts(series);
  const result = entries.findIndex(postIsPublished) >= 0
  console.log(`seriesIsPublished(${series.slug}) ${entries.length} ${result}`);
  return result;
}

/**
 * @returns A list of all posts in the series.
 */
export const getSeriesPosts = async (series: CollectionEntry<"series">) => {
  return await getBlogEntries((entry) => {
    if(!entry.data.series) { return false; }
    return entry.data.series.seriesId.slug == series.slug;
  });
}

export const getSeriesList = async (): Promise<CollectionEntry<"series">[]> => {
	const seriesList = await getCollection('series');
  return await asyncFilter(seriesList, seriesIsPublished);
}

/* -------------------------------------------------------------------------- */

/**
 * A wrapper around Astro's `getCollection("blog", _)` which excludes
 * unpublished entries.  Other queries should use this one instead of
 * calling `getCollection` directly.
 */
export const getBlogEntries = (filter?: (entry: CollectionEntry<"blog">) => boolean) => {
  return getCollection("blog", entry => {
    if(IS_PROD && !postIsPublished(entry)) { return false; }
    return filter ? filter(entry) : true;
  });
}

/**
 * @returns A list of all posts, optionally
 *   excluding posts belonging to a series.
 */
export const getPosts = async (
  options: {
    includeSeries: boolean
  }
) => {
  return await getBlogEntries((entry) => {
    if(!options.includeSeries && entry.data.series) { return false; }
    return entry.data.kind === "post";
  });
}

/**
 * @returns A list of all projects.
 */
export const getProjects = async () => {
  return await getBlogEntries((entry) => {
    return entry.data.kind === "project";
  });
}

/* -------------------------------------------------------------------------- */