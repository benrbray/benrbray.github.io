import { defineCollection, reference, z } from 'astro:content';

const postSchema = z.object({
	title: z.string(),
	summary: z.string(),
	kind: z.enum(["post", "project"]).default("post"),
	// Transform string to Date object
	datePublished: z.coerce.date(),
	dateUpdated: z.coerce.date().optional(),
	imageThumbnail: z.string().optional(),
	series: z.object({
		seriesName: reference("series"),
		seriesNumber: z.number().int().gte(1)
	}).optional()
});

const blog = defineCollection({
	type: 'content',
	schema: postSchema
});

const project = defineCollection({
	type: 'content',
	schema: postSchema
});

const series = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		imageSummary: z.string()
	}),
});

export const collections = {
	blog,
	series,
	project
};
