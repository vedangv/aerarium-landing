import { test, expect } from './helpers';

for (const width of [390, 1440]) {
  test(`direct section links survive reload and history navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/#security');
    await expect(page.locator('#security h2')).toBeInViewport();
    await expect(page.locator('#security h2')).toHaveCSS('opacity', '1');
    await page.reload();
    await expect(page.locator('#security h2')).toBeInViewport();
    await expect(page.locator('#security h2')).toHaveCSS('opacity', '1');
    await page.evaluate(() => { window.location.hash = '#answer'; });
    await expect(page.locator('#answer h2')).toBeInViewport();
    await expect(page.locator('#answer h2')).toHaveCSS('opacity', '1');
    await page.goBack();
    await expect(page.locator('#security h2')).toBeInViewport();
    await expect(page.locator('#security h2')).toHaveCSS('opacity', '1');
  });
}

test('mobile navigation contains focus, closes with Escape, and restores focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open navigation menu' });
  await toggle.click();
  const dialog = page.getByRole('dialog', { name: 'Navigation' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Close navigation menu' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('link', { name: 'Portfolio', exact: true })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: 'Close navigation menu' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('link', { name: 'Get the App', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await dialog.getByRole('link', { name: 'Security', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.locator('#security h2')).toBeInViewport();
  await expect(page).toHaveURL(/#security$/);
});

test('the brand is a keyboard link and hidden desktop actions are skipped', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.locator('#aerarium-navbar')).toBeVisible();
  // Option+Tab includes links in Safari's default keyboard-navigation mode.
  const tab = browserName === 'webkit' ? 'Alt+Tab' : 'Tab';
  await page.keyboard.press(tab);
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press(tab);
  await expect(page.getByRole('link', { name: 'Aerarium home', exact: true })).toBeFocused();
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Launch updates', exact: true }).focus();
  await page.keyboard.press(tab);
  await expect(page.locator('#btn-hero-join-waitlist')).toBeFocused();
});

test('desktop section links land on readable content in the scroll scenes', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Security', exact: true }).click();
  await expect(page.locator('#security h2')).toHaveCSS('opacity', '1');
  await expect(page.locator('#security h2')).toBeInViewport();
});

test('focusing a link reveals it even after its scroll scene has faded', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.locator('#aerarium-navbar')).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: 1800, behavior: 'instant' }));
  const link = page.locator('#btn-hero-join-waitlist');
  await link.focus();
  await expect.poll(() => link.evaluate(element => {
    let opacity = 1;
    for (let node: Element | null = element; node; node = node.parentElement) {
      opacity *= Number(getComputedStyle(node).opacity);
    }
    return opacity;
  })).toBe(1);
});
