/**
 * The apex must expose crawl paths in RAW HTML.
 *
 * This is a Vite SPA: the server response is an empty #root, so Googlebot's
 * first-pass link extraction sees only what is literally in index.html. The
 * React nav/footer do link to research.aerarium.app, but only after JS runs and
 * only to the bare root. Measured 2026-08-25: aerarium.app/ was the ONLY
 * indexed URL on the domain while research.aerarium.app/ was "Crawled -
 * currently not indexed" and nearly everything below it "URL is unknown".
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const html = () => readFileSync(new URL('../index.html', import.meta.url), 'utf8')

test('links the research hubs in raw HTML', () => {
  const h = html()
  for (const path of ['/', '/stocks', '/sectors', '/earnings', '/macro', '/learn']) {
    assert.ok(h.includes(`href="https://research.aerarium.app${path}"`),
      `missing raw-HTML link to research${path}`)
  }
})

test('deep-links the free showcase tickers', () => {
  const h = html()
  for (const t of ['NVDA', 'AAPL', 'TSLA', 'AMZN', 'PLTR']) {
    assert.ok(h.includes(`href="https://research.aerarium.app/stocks/${t}"`),
      `missing raw-HTML link to ${t}`)
  }
})

test('links the apex static pages that are in sitemap.xml', () => {
  const h = html()
  for (const p of ['/portfolio-x-ray', '/policy-score', '/methodology', '/security']) {
    assert.ok(h.includes(`href="${p}"`), `sitemap page ${p} is unreachable by link`)
  }
})

test('the crawl footer is OUTSIDE #root so React cannot replace it', () => {
  const h = html()
  const root = h.indexOf('<div id="root">')
  const foot = h.indexOf('<footer')
  assert.ok(root !== -1 && foot > root, 'footer must follow #root')
  assert.ok(h.slice(root, foot).includes('</div>'), '#root must be closed before the footer')
})

test('the links are followable', () => {
  // rel="nofollow" would defeat the entire point; noopener/noreferrer are fine.
  const h = html()
  const footer = h.slice(h.indexOf('<footer'), h.indexOf('</footer>'))
  assert.ok(!/nofollow/.test(footer), 'crawl-path links must not be nofollow')
})
