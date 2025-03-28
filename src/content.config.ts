import { defineCollection, reference, z } from 'astro:content';
import { glob } from "astro/loaders";

const postSchema = z.object({
	title: z.string(),
	titleDisplay: z.string().optional(),
	summary: z.string(),
	kind: z.enum(["post", "project"]).default("post"),
	published: z.boolean().default(false),
	/** explicitly set post URL, for instance to link to a static PDF */
	url: z.string().optional(),
	// Transform string to Date object
	datePublished: z.coerce.date(),
	dateUpdated: z.coerce.date().optional(),
	imageThumbnail: z.string().optional(),
	tags: z.array(z.string()).optional(),
	tools: z.array(z.string()).optional(),
	format: z.enum(["pdf"]).optional(),
	series: z.object({
		seriesId: reference("series"),
		seriesNumber: z.number().int().gte(1),
		isAppendix: z.boolean().optional()
	}).optional(),
	priority: z.enum(["normal", "low"]).default("normal")
});

const post = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/post" }),
	schema: postSchema
});

const series = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/series" }),
	schema: z.object({
		title: z.string(),
		imageSummary: z.string()
	}),
});

const game = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/game" }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		datePublished: z.coerce.date(),
		/** explicitly set post URL */
		url: z.string().optional(),
		newgroundsUrl: z.string().optional()
	})
});

export const collections = {
	post,
	series,
	game,
};
