import { test, expect } from './helpers';

for (const viewport of [{ width: 390, height: 844 }, { width: 320, height: 568 }, { width: 768, height: 1024 }]) {
  test(`content is readable without scrolling to reveal it at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await expect(page.locator('#aerarium-navbar')).toBeVisible();
    const layout = await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      width: document.documentElement.scrollWidth,
      availableWidth: document.documentElement.clientWidth,
      hiddenHeadings: [...document.querySelectorAll('h1, h2')].filter(heading => {
        for (let node: Element | null = heading; node; node = node.parentElement) {
          if (Number(getComputedStyle(node).opacity) < 1) return true;
        }
        return false;
      }).map(heading => heading.textContent),
      stickyScenes: [...document.querySelectorAll('main *')].filter(node => getComputedStyle(node).position === 'sticky').length,
    }));
    expect(layout.width).toBe(layout.availableWidth);
    expect(layout.height).toBeLessThan(15000);
    expect(layout.hiddenHeadings).toEqual([]);
    expect(layout.stickyScenes).toBe(0);
    await expect(page.getByRole('main')).toBeVisible();
  });
}

test('reduced motion shows content immediately at desktop width', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('#aerarium-navbar')).toBeVisible();
  await expect(page.locator('#answer h2')).toHaveCSS('opacity', '1');
  await expect(page.locator('#security h2')).toHaveCSS('opacity', '1');
  await expect(page.locator('#founder-story h2')).toHaveCSS('opacity', '1');
  await expect(page.locator('#waitlist').locator('input[type=email]')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeLessThan(15000);
});

test('a short desktop window does not clip content inside pinned scenes', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 600 });
  await page.goto('/');
  await expect(page.locator('#answer h2')).toHaveCSS('opacity', '1');
  expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeLessThan(15000);
});

test('scroll scenes work after resizing from phone to desktop and back', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('#answer h2')).toHaveCSS('opacity', '1');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator('#answer .sticky')).toBeVisible();
  await page.locator('#answer').evaluate(element => {
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY + 1200, behavior: 'instant' });
  });
  await expect(page.locator('#answer h2')).toHaveCSS('opacity', '1');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('#answer .sticky')).toHaveCount(0);
  await expect(page.locator('#answer h2')).toHaveCSS('opacity', '1');
  expect(errors).toEqual([]);
});

for (const mode of ['no JavaScript', 'failed app script']) {
  test(`homepage still explains the app with ${mode}`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: mode !== 'no JavaScript' });
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      return url.origin !== 'http://127.0.0.1:4174' || route.request().resourceType() === 'script'
        ? route.abort() : route.continue();
    });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4174/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Download on the App Store' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Portfolio X-Ray', exact: true })).toBeVisible();
    await context.close();
  });
}
