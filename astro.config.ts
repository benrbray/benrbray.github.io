import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import solid from "@astrojs/solid-js";
import fs from "node:fs";

// remark
import remarkMath from "remark-math";
import remarkCite from "@benrbray/remark-cite";
import remarkExtractBibtex from "@benrbray/remark-extract-bibtex";
import remarkDirective from "remark-directive";

// rehype
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCite from "@benrbray/rehype-cite";

// vite
import vitePluginWasm from "vite-plugin-wasm";

// bibliography file
import solidJs from "@astrojs/solid-js";
const bibFiles = [
  fs.readFileSync("./public/references/category-theory.bib").toString(),
  fs.readFileSync("./public/references/game-physics.bib").toString(), fs.readFileSync("./public/references/datalog.bib").toString(), fs.readFileSync("./public/references/dhgp.bib").toString(), fs.readFileSync("./public/references/publications.bib").toString(),
  fs.readFileSync("./public/references/refs.bib").toString(),
  fs.readFileSync("./public/references/type-safari.bib").toString()
];

// pagefind
import pagefind from "astro-pagefind";


// https://astro.build/config
export default defineConfig({
  site: 'https://benrbray.com',
  build: {
    format: "file"
  },
  integrations: [
    mdx(),
    sitemap(),
    solid({
      include: ["**/solid/*"]
    }),
    solidJs(),
    pagefind()
  ],
  markdown: {
    remarkPlugins: [remarkMath, remarkCite, remarkExtractBibtex, remarkDirective],
    rehypePlugins: [
      [rehypeCite, { bibFiles }],
      [rehypeKatex, { macros: { "\\R": "\\mathbb{R}" }, globalGroup: true}],
      [rehypeSlug, {}], [rehypeAutolinkHeadings, {
        behavior: "wrap",
        headingProperties: {
          className: ["heading anchor"]
        },
        properties: {
          className: ["anchor-link"]
        }
      }]
    ],
    shikiConfig: {
      themes: {
        light: "one-light",
        dark: "one-dark-pro"
      }
    }
  },
  vite: {
    plugins: [vitePluginWasm()],
  }
});