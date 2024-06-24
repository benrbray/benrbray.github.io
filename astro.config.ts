import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import solid from "@astrojs/solid-js";

// markdown extensions
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
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
      [rehypeKatex, {
        macros: {"\\R": "\\mathbb{R}"},
        globalGroup: true
      }],
      [rehypeCitation, { bibliography: [
        "./public/references/category-theory.bib",
        "./public/references/game-physics.bib",
      ], linkCitations: true }],
      [rehypeSlug, { }],
      [rehypeAutolinkHeadings, { 
        behavior: "wrap",
        headingProperties: {
          className: ["heading anchor"]
        },
        properties: {
          className: ["anchor-link"]
        }
       }]
    ]
  }
});