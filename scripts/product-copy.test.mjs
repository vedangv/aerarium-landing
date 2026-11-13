import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { renderSeoPage, seoPages } from './seo-pages.mjs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

function assertPremiumPrices(content, label) {
  const prices = [...content.matchAll(/US\$(\d+(?:\.\d+)?)(?:\/| per )(month|year)\b/g)]
    .map(([, amount, period]) => [amount, period]);
  assert.ok(prices.length > 0, `${label}: Premium prices must be present`);
  assert.equal(prices.length % 2, 0, `${label}: every monthly price needs an annual price`);
  for (let index = 0; index < prices.length; index += 2) {
    assert.deepEqual(prices.slice(index, index + 2), [['7.99', 'month'], ['79.99', 'year']], label);
  }
}

test('homepage metadata and fallback include both confirmed Premium plans', () => {
  const html = read('index.html');
  assert.match(html.match(/<title>(.*?)<\/title>/s)[1], /portfolio.*iPhone/i);
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  const app = graph.find(item => item['@id'].endsWith('#portfolio-app'));
  assertPremiumPrices(app.offers.description, 'Portfolio structured data');
  const fallbackPrice = html.match(/<p[^>]*>Free to download\.[\s\S]*?<\/p>/)?.[0];
  assert.ok(fallbackPrice, 'The HTML fallback must keep its free download and pricing note');
  assertPremiumPrices(fallbackPrice, 'HTML fallback');
  assert.match(app.description, /Premium.*brokerage sync/);
  const research = graph.find(item => item['@id'].endsWith('#research'));
  assert.equal(research.offers.price, '10');
  assert.equal(research.offers.priceCurrency, 'CAD');
});

test('published copy uses explicit currencies and does not advertise unconfirmed prices', () => {
  for (const path of ['index.html', 'public/terms.html', 'public/llms.txt', 'src/components/HeroQuestionsScene.tsx', 'src/components/CtaBridge.tsx', 'src/components/SecuritySection.tsx', 'README.md']) {
    const content = read(path);
    assertPremiumPrices(content, path);
    assert.doesNotMatch(content, /\$(?:9\.99|89\.99)\b|Free on iOS|full app — free/, path);
  }
  assert.match(read('public/terms.html'), /Apple shows regional prices in the app before purchase/);
  const research = read('src/components/ResearchCloseCta.tsx');
  assert.match(research, /CA\$10\/month/);
  assert.doesNotMatch(research, /≈|US\$7\b/);
});

test('all guides send visitors to the released app and disclose paid sync', () => {
  for (const page of seoPages) {
    const html = renderSeoPage(page);
    assert.match(html, /href="https:\/\/apps\.apple\.com\/app\/aerarium\/id6760155168\?/);
    assertPremiumPrices(html, page.slug);
    assert.match(html, /Premium.*US\$7\.99\/month or US\$79\.99\/year.*brokerage sync/);
    assert.doesNotMatch(html, /testflight\.apple\.com|free during the iOS beta/);
  }
});

test('the link-preview source labels the example and the paid sync feature accurately', () => {
  const template = read('scripts/og-image.html');
  assert.ok(!/Free during beta/.test(template), 'The published preview must not advertise the old free beta');
  assert.match(template, /Illustrative example/);
  assert.match(template, /Premium brokerage sync/);
});
