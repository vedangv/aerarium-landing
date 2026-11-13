import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { renderSeoPage, seoPages } from './seo-pages.mjs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('homepage metadata identifies the iPhone app and the confirmed monthly prices', () => {
  const html = read('index.html');
  assert.match(html.match(/<title>(.*?)<\/title>/s)[1], /portfolio.*iPhone/i);
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  const app = graph.find(item => item['@id'].endsWith('#portfolio-app'));
  assert.match(app.offers.description, /US\$7\.99\/month/);
  assert.match(app.description, /Premium.*brokerage sync/);
  const research = graph.find(item => item['@id'].endsWith('#research'));
  assert.equal(research.offers.price, '10');
  assert.equal(research.offers.priceCurrency, 'CAD');
});

test('published copy uses explicit currencies and does not advertise unconfirmed prices', () => {
  for (const path of ['index.html', 'public/terms.html', 'public/llms.txt', 'src/components/HeroQuestionsScene.tsx', 'src/components/CtaBridge.tsx']) {
    const content = read(path);
    assert.match(content, /US\$7\.99(?:\/month| per month)/, path);
    assert.doesNotMatch(content, /9\.99|89\.99|Free on iOS|full app — free/, path);
  }
  const research = read('src/components/ResearchCloseCta.tsx');
  assert.match(research, /CA\$10\/month/);
  assert.doesNotMatch(research, /≈|US\$7\b/);
});

test('all guides send visitors to the released app and disclose paid sync', () => {
  for (const page of seoPages) {
    const html = renderSeoPage(page);
    assert.match(html, /href="https:\/\/apps\.apple\.com\/app\/aerarium\/id6760155168"/);
    assert.match(html, /Premium.*US\$7\.99\/month.*brokerage sync/);
    assert.doesNotMatch(html, /testflight\.apple\.com|free during the iOS beta/);
  }
});

test('the link-preview source labels the example and the paid sync feature accurately', () => {
  const template = read('scripts/og-image.html');
  assert.ok(!/Free during beta/.test(template), 'The published preview must not advertise the old free beta');
  assert.match(template, /Illustrative example/);
  assert.match(template, /Premium brokerage sync/);
});
