import { test, expect } from './helpers';

function expectCrosslink(href: string | null, destination: 'app' | 'research') {
  const url = new URL(href!);
  expect(url.origin).toBe(destination === 'app' ? 'https://apps.apple.com' : 'https://research.aerarium.app');
  expect(url.pathname).toBe(destination === 'app' ? '/app/aerarium/id6760155168' : '/');
  expect(url.searchParams.get('utm_source')).toBe('landing');
  expect(url.searchParams.get('utm_medium')).toBe('crosslink');
  expect(url.searchParams.get('utm_campaign')).toBe(destination);
  expect(url.searchParams.get('utm_content')).toBeTruthy();
}

for (const width of [390, 1440]) {
  test(`Research is reachable from navigation, its section and the footer at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    if (width < 1024) await page.getByRole('button', { name: 'Open navigation menu' }).click();
    const navigation = page.getByRole('navigation', { name: 'Primary' });
    const research = navigation.getByRole('link', { name: 'Research', exact: true });
    await expect(research).toBeVisible();
    expectCrosslink(await research.getAttribute('href'), 'research');
    expect(await research.getAttribute('rel')).not.toMatch(/nofollow/);
    // Follow the actual link, but intercept it locally so no live site is contacted.
    await page.context().route('https://research.aerarium.app/**', route => route.fulfill({ body: 'Research link reached' }));
    const popupPromise = page.waitForEvent('popup');
    await research.click();
    const popup = await popupPromise;
    await popup.waitForLoadState();
    expectCrosslink(popup.url(), 'research');
    await popup.close();
    if (width < 1024) await page.keyboard.press('Escape');
    expectCrosslink(await page.locator('#btn-research-close').getAttribute('href'), 'research');
    expectCrosslink(await page.getByRole('contentinfo').getByRole('link', { name: 'Research', exact: true }).getAttribute('href'), 'research');
    expectCrosslink(await page.locator('#hero a').getAttribute('href'), 'app');
    await expect(page.locator('#hero a')).toHaveCount(1);
  });

  test(`guides keep both product links visible at ${width}px without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width, height: 900 } });
    await context.route('**/*', route => new URL(route.request().url()).origin === 'http://127.0.0.1:4174' ? route.continue() : route.abort());
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4174/portfolio-x-ray.html');
    for (const region of [page.locator('header'), page.getByRole('contentinfo')]) {
      const research = region.getByRole('link', { name: /Research/ });
      const app = region.getByRole('link', { name: /Get the App/ });
      await expect(research).toBeVisible();
      await expect(app).toBeVisible();
      expectCrosslink(await research.getAttribute('href'), 'research');
      expectCrosslink(await app.getAttribute('href'), 'app');
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await context.close();
  });
}
