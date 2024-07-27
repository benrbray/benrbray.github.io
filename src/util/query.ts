import { getCollection, type CollectionEntry } from "astro:content";

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
  if(post.data.kind === "project") {
    return `/projects/${shortenProjectSlug(post.slug)}`;
  } else {
    return `/blog/${post.slug}`;
  }
}

/* -------------------------------------------------------------------------- */

/**
 * @returns A list of all posts, optionally
 *   excluding posts belonging to a series.
 */
export const getPosts = async (options: { includeSeries: boolean }) => {
  return await getCollection("blog", (entry) => {
    if(!options.includeSeries && entry.data.series) { return false; }
    return entry.data.kind === "post";
  });
}

/**
 * @returns A list of all projects.
 */
export const getProjects = async () => {
  return await getCollection("blog", (entry) => {
    return entry.data.kind === "project";
  });
}

/**
 * @returns A list of all posts in the series.
 */
export const getSeriesPosts = async (series: CollectionEntry<"series">) => {
  const posts = await getCollection("blog", ({ data }) => {
    if(!data.series) { return false; }
    return data.series.seriesId.slug == series.slug;
  });

	return posts;
}

/* -------------------------------------------------------------------------- */