import { test, expect } from './helpers';

for (const width of [390, 1440]) {
  test(`the hero explains the iPhone app with one download action at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    const hero = page.locator('#hero');
    await expect(hero.getByRole('heading', { level: 1 })).toHaveText('See what you actually own.');
    await expect(hero.getByText(/all in one iPhone app/)).toBeVisible();
    await expect(hero.getByRole('link')).toHaveCount(1);
    await expect(hero.getByRole('link')).toHaveAttribute('href', /^https:\/\/apps\.apple\.com\/app\/aerarium\/id6760155168\?/);
    await expect(hero.getByText('Free to download · Premium US$7.99/month or US$79.99/year')).toBeVisible();
    await expect(hero.getByText('Brokerage sync requires Premium.')).toBeVisible();
  });
}

test('both Premium plans fit in phone pricing sections', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const pricing = 'Free to download · Premium US$7.99/month or US$79.99/year';
  const bridge = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Put your investing plan in view.' }) });
  const sections = [
    { name: 'hero', locator: page.locator('#hero').getByText(pricing, { exact: true }) },
    { name: 'bridge', locator: bridge.getByText(pricing, { exact: true }) },
    { name: 'security', locator: page.locator('#security').getByText('Optional Premium (US$7.99/month or US$79.99/year) includes read-only brokerage sync (SnapTrade). Aerarium never places trades.', { exact: true }) },
  ];
  for (const { name, locator } of sections) {
    await locator.scrollIntoViewIfNeeded();
    await expect(locator).toBeInViewport({ ratio: 1 });
    const box = await locator.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(390);
    await page.screenshot({ path: testInfo.outputPath(`${name}-phone.png`) });
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
});

test.describe('static pricing without JavaScript', () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });

  test('fallback, terms and guide show both plans on phones', async ({ page }, testInfo) => {
    for (const [name, path, copy] of [
      ['fallback', '/', 'Free to download. Premium US$7.99/month or US$79.99/year includes read-only brokerage sync.'],
      ['terms', '/terms.html', 'US$7.99 per month or US$79.99 per year'],
      ['guide', '/portfolio-x-ray.html', 'Aerarium Portfolio is free to download. Optional Premium (US$7.99/month or US$79.99/year) includes read-only brokerage sync. Aerarium never places trades.'],
    ]) {
      await page.goto(path);
      const price = page.getByText(copy, { exact: true });
      await price.scrollIntoViewIfNeeded();
      await expect(price).toBeInViewport({ ratio: 1 });
      const box = await price.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(390);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
      await page.screenshot({ path: testInfo.outputPath(`${name}-phone.png`) });
    }
  });
});
