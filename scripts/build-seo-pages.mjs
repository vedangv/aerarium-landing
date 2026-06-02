import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { renderSeoPage, seoPages } from "./seo-pages.mjs";

const distDir = resolve("dist");
await mkdir(distDir, { recursive: true });

for (const page of seoPages) {
  const outputPath = resolve(distDir, `${page.slug}.html`);
  await writeFile(outputPath, renderSeoPage(page), "utf8");
  console.log(`[seo-pages] wrote ${page.slug}.html`);
}

