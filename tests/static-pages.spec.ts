import { test, expect } from './helpers';

test.use({ javaScriptEnabled: false });

for (const width of [390, 1440]) {
  for (const path of ['/portfolio-x-ray.html', '/privacy.html', '/terms.html', '/support.html']) {
    test(`keyboard users can skip navigation on ${path} at ${width}px without JavaScript`, async ({ page, browserName }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(path);
      const skip = page.getByRole('link', { name: 'Skip to content', exact: true });
      await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
      await expect(skip).toBeFocused();
      await expect(skip).toBeInViewport();
      await expect(skip).toHaveCSS('outline-style', 'solid');
      await page.keyboard.press('Enter');
      await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
      await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
      await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
        await page.evaluate(() => document.documentElement.clientWidth),
      );
    });
  }
}
