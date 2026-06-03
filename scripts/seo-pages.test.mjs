import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { renderSeoPage, seoPages } from "./seo-pages.mjs";

const expectedSlugs = [
  "portfolio-x-ray",
  "investment-policy-statement-app",
  "policy-score",
  "goals-funding-plan",
  "investment-thesis-tracker",
  "security",
  "methodology",
];

describe("static SEO pages", () => {
  it("defines the complete Phase 2 content wedge", () => {
    assert.deepEqual(seoPages.map((page) => page.slug), expectedSlugs);
  });

  it("renders crawlable visible content and metadata for every page", () => {
    for (const page of seoPages) {
      const html = renderSeoPage(page);
      assert.match(html, /^<!doctype html>/);
      assert.match(html, new RegExp(`<link rel="canonical" href="https://aerarium\\.app/${page.slug}"`));
      assert.match(html, new RegExp(`<h1>${page.h1.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</h1>`));
      assert.match(html, /<meta name="robots" content="index,follow,max-image-preview:large"/);
      assert.match(html, /"@type":"FAQPage"/);
      assert.match(html, /Join the free iOS beta/);
      assert.doesNotMatch(html, /<div id="root"><\/div>/);
    }
  });

  it("renders real screenshot references and internal links", () => {
    for (const page of seoPages) {
      const html = renderSeoPage(page);
      assert.match(html, new RegExp(`<img src="${page.image}"`));
      for (const related of page.related) {
        assert.match(html, new RegExp(`href="/${related}"`));
      }
    }
  });
});

