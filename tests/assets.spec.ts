import { test, expect } from './helpers';

test('large ambient backgrounds stay still on phones', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const glows = page.locator('[class*="animate-glow-slow-"]');
  await expect(glows).toHaveCount(3);
  for (const glow of await glows.all()) await expect(glow).toHaveCSS('animation-name', 'none');
});

test('brand and phone images fit their delivery budgets', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  for (const [selector, budget] of [['#btn-nav-logo img', 40000], ['#answer img', 80000], ['#policy-score img', 80000], ['#thesis img', 80000]] as const) {
    const image = page.locator(selector);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(element => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0)).toBe(true);
    const bytes = await image.evaluate(async element => {
      const response = await fetch((element as HTMLImageElement).currentSrc);
      return (await response.arrayBuffer()).byteLength;
    });
    expect(bytes, selector).toBeLessThan(budget);
  }
});

test('the original brand fonts load without third-party requests', async ({ page }) => {
  const external: string[] = [];
  page.on('request', request => {
    if (!request.url().startsWith('http://127.0.0.1:4174/')) external.push(request.url());
  });
  await page.goto('/');
  await expect(page.locator('#aerarium-navbar')).toBeVisible();
  const fonts = await page.evaluate(async () => {
    await document.fonts.ready;
    return Promise.all(['Inter', 'Instrument Serif', 'Space Grotesk', 'JetBrains Mono'].map(async family => ({
      family, loaded: (await document.fonts.load(`16px "${family}"`)).length > 0,
    })));
  });
  expect(fonts.every(font => font.loaded), JSON.stringify(fonts)).toBe(true);
  expect(external).toEqual([]);
});
