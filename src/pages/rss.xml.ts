import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '@root/consts';
import { getBlogPosts, getPostUrl } from '@root/util/query';
import type { AstroGlobal, Props } from 'astro';

type Context = Readonly<AstroGlobal<Props, (_props: Props) => any, Record<string, string | undefined>>>;

export async function GET(context: Context) {
	const posts = await getBlogPosts({
		includeSeries: true,
		includeUnpublished: false
	});
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site!,
		trailingSlash: false,
		items: posts.map((post) => ({
			...post.data,
			pubDate: post.data.datePublished,
			link: getPostUrl(post),
			author: "Benjamin R. Bray",
		})),
	});
}
