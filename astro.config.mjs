import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import markdoc from "@astrojs/markdoc";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";

// https://astro.build/config
export default defineConfig({
  site: "https://vibing-dev-ev9.pages.dev/",
  // trailingSlash: "never",
  integrations: [
    svelte(),
    tailwind(),
    markdoc(),
    sitemap({
      filter: (p) => !p.includes("/draft/"),
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: { theme: 'css-variables' }
  },
    wrap: true,

  scopedStyleStrategy: "where",
  
});