import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { renderSeoPage, seoPages } from './seo-pages.mjs';

const homepage = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('homepage and guides attribute every cross-property HTML link without changing canonical URLs', () => {
  for (const html of [homepage, ...seoPages.map(renderSeoPage)]) {
    const links = [...html.matchAll(/<a\b[^>]*href="(https:\/\/(?:apps\.apple\.com|research\.aerarium\.app)[^"]*)"[^>]*>/g)];
    assert.ok(links.length >= 2);
    for (const [tag, href] of links) {
      const url = new URL(href.replaceAll('&amp;', '&'));
      assert.equal(url.searchParams.get('utm_source'), 'landing', href);
      assert.equal(url.searchParams.get('utm_medium'), 'crosslink', href);
      assert.equal(url.searchParams.get('utm_campaign'), url.hostname === 'apps.apple.com' ? 'app' : 'research', href);
      assert.ok(url.searchParams.get('utm_content'), href);
      assert.doesNotMatch(tag, /nofollow/);
    }
    assert.match(html, /name="apple-itunes-app" content="app-id=6760155168"/);
    const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)[1];
    assert.equal(new URL(canonical).search, '');
  }
});

test('organisation and app structured data identify the actual App Store listing', () => {
  const graph = JSON.parse(homepage.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  const appStore = 'https://apps.apple.com/app/aerarium/id6760155168';
  const org = graph.find(item => item['@type'] === 'Organization');
  assert.ok(org.sameAs.includes(appStore));
  assert.ok(org.sameAs.includes('https://research.aerarium.app/'));
  assert.equal(graph.find(item => item['@type'] === 'SoftwareApplication').installUrl, appStore);
});
