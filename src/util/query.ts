import { getCollection, type CollectionEntry } from "astro:content";

export const shortenProjectSlug = (slug: string) => {
    const prefix = "project/";
    if(slug.startsWith(prefix)) {
      return slug.slice(prefix.length);
    } else {
      return slug;
    }
  }

export const getPostUrl = (post: CollectionEntry<"blog">) => {
  if(post.data.kind === "project") {
    return `/project/${shortenProjectSlug(post.slug)}`;
  } else {
    return `/blog/${post.slug}`;
  }
}

export const getPosts = async (options: { includeSeries: boolean }) => {
  return await getCollection("blog", ({ data }) => {
    if(!options.includeSeries && data.series) { return false; }
    return data.kind === "post"
  });
}

export const getProjects = async () => {
  return await getCollection("blog", ({ data }) => {
    return data.kind === "project"
  });
}

export const getSeriesPosts = async (series: CollectionEntry<"series">) => {
  const posts = await getCollection("blog", ({ data }) => {
    if(!data.series) { return false; }
    return data.series.seriesId.slug == series.slug;
  });

	return posts;
}