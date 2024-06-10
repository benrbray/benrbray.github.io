import { defineCollection, reference, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		datePublished: z.coerce.date(),
		dateUpdated: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		series: z.object({
			seriesName: reference("series"),
			seriesNumber: z.number().int().gte(1)
		}).optional()
	}),
});

const series = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		imageSummary: z.string()
	}),
});

export const collections = {
	blog,
	series
};
