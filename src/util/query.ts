import { getCollection, type CollectionEntry, getEntry } from "astro:content";
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
 * Reduces a slug to its basename, ignoring the folder hierarchy.
 *   shortenSlug("foo/bar/baz") = "baz"
 */
export const shortenSlug = (slug: string) => {
  const basename = slug.split("/").pop();
  return basename;
}

/**
 * Computes the slug for a given post, so that the `content/`
 * folder can be freely reorganized without breaking URLs.
 */
export const getPostUrlSlug = (post: CollectionEntry<"post">) => {
  const shortened = shortenSlug(post.slug);

  if(post.data.kind === "project") {
    return { group: "projects", urlSlug: `${shortened}` }
  }

  if(post.data.series) {
    return { group: "blog", urlSlug: `${post.data.series.seriesId.slug}/${shortened}` }
  } else {
    return { group: "blog", urlSlug: `${shortened}` }
  }
}

/**
 * Computes the URL for a given post, so that the `content/`
 * folder can be freely reorganized without breaking URLs.
 */
export const getPostUrl = (post: CollectionEntry<"post">): string => {
  // some posts explicitly provide a URL, for
  // example when linking to a static PDF file
  if(post.data.url) {
    return post.data.url;
  }

  const slug = getPostUrlSlug(post);
  return `/${slug.group}/${slug.urlSlug}`;
}

export const getPostUrlBySlug = async (postSlug: CollectionEntry<"post">["slug"]): Promise<string> => {
  const post = await getEntry({ collection: "post", slug: postSlug });
  return getPostUrl(post);
}

type HasPublished = { data : { published : boolean } };

export const postIsPublished = (post: HasPublished) => {
  return post.data.published;
}

export const postDisplayTitle = (post: CollectionEntry<"post">) => {
  return post.data.titleDisplay || post.data.title;
}

/* ---- series -------------------------------------------------------------- */

export const seriesIsPublished = async (series: CollectionEntry<"series">): Promise<boolean> => {
  const entries = await getSeriesPosts(series);
  const result = entries.findIndex(postIsPublished) >= 0;
  return IS_DEV || result;
}

/**
 * @returns A list of all posts in the series.
 */
export const getSeriesPosts = async (series: CollectionEntry<"series">) => {
  return await getPosts(entry => {
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
 * A wrapper around Astro's `getCollection(_, _)` which excludes
 * unpublished entries.  Other queries should use this one instead of
 * calling `getCollection` directly.
 */
export const getPosts = (filter?: (entry: CollectionEntry<"post">) => boolean) => {
  return getCollection("post", entry => {
    if(IS_PROD && !postIsPublished(entry)) { return false; }
    return filter ? filter(entry) : true;
  });
}

/**
 * @returns A list of all posts, optionally
 *   excluding posts belonging to a series.
 */
export const getBlogPosts = async (
  options: {
    includeSeries: boolean,
    includeUnpublished?: boolean,
  },
  filter?: (entry: CollectionEntry<"post">) => boolean
) => {
  return await getPosts((entry) => {
    if(!options.includeSeries && entry.data.series) { return false; }
    if(!options.includeUnpublished && !postIsPublished(entry)) { return false; }
    if (entry.data.kind !== "post") { return false; }
    return filter ? filter(entry) : true;
  });
}

/* -------------------------------------------------------------------------- */

/**
 * @returns A list of all projects.
 */
export const getProjects = async () => {
  return await getPosts((entry) => {
    return entry.data.kind === "project";
  });
}

/* -------------------------------------------------------------------------- */

export const getGames = (filter?: (entry: CollectionEntry<"game">) => boolean) => {
  return getCollection("game", entry => {
    return filter ? filter(entry) : true;
  });
}

export const getGameUrl = (game: CollectionEntry<"game">) => {
  // some posts explicitly provide a URL
  if(game.data.url) {
    return game.data.url;
  }

  return `/game/${game.slug}`;
}