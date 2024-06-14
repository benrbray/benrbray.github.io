import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import solid from "@astrojs/solid-js";

// markdown extensions
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeCitation from "rehype-citation";

// https://astro.build/config
export default defineConfig({
  site: 'https://benrbray.com',
  integrations: [mdx(), sitemap(), solid({ include: ["**/solid/*"]})],
  markdown: {
    remarkPlugins: [
      remarkMath
    ],
    rehypePlugins: [
      [rehypeKatex, { macros: {"\\R": "\\mathbb{R}"} }],
      [rehypeCitation, { bibliography: ["./public/references/category-theory.bib"], linkCitations: true }],
    ]
  }
});