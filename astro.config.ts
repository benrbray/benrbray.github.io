import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import solid from "@astrojs/solid-js";

import fs from "node:fs";

// markdown extensions
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkCite from "@benrbray/remark-cite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCite from "@benrbray/rehype-cite";

// bibliography file
const bibFiles = [
  fs.readFileSync("./public/references/category-theory.bib").toString(),
  fs.readFileSync("./public/references/game-physics.bib").toString(),
  fs.readFileSync("./public/references/datalog.bib").toString(),
  fs.readFileSync("./public/references/dhgp.bib").toString(),
  fs.readFileSync("./public/references/publications.bib").toString()
];

// https://astro.build/config
export default defineConfig({
  site: 'https://benrbray.com',
  integrations: [mdx(), sitemap(), solid({ include: ["**/solid/*"]})],
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkCite
    ],
    rehypePlugins: [
      [rehypeCite, { bibFiles }],
      [rehypeKatex, {
        macros: {"\\R": "\\mathbb{R}"},
        globalGroup: true
      }],
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