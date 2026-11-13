import AxeBuilder from '@axe-core/playwright';
import { test, expect } from './helpers';

for (const width of [390, 1440]) {
  test(`visible homepage content passes automated accessibility checks at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('#input-waitlist-email')).toBeVisible();
    await page.locator('details').evaluateAll(elements => elements.forEach(element => element.setAttribute('open', '')));
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice']).analyze();
    expect(results.violations).toEqual([]);
  });
}

test('the mobile menu and signup confirmation have accessible names and contrast', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route('**/api/waitlist', route => route.fulfill({ json: {
    email: 'test@example.com', registeredAt: '2026-11-13T00:00:00.000Z',
    ticketNumber: 'AER-1234ABCD', referralCode: 'AER-1234ABCD', referralCount: 0,
  } }));
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  const menu = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice']).analyze();
  expect(menu.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await page.getByLabel('Email address').fill('test@example.com');
  await page.getByRole('button', { name: 'Get launch updates' }).click();
  await expect(page.getByRole('heading', { name: "You're on the founder list" })).toBeVisible();
  const confirmation = await new AxeBuilder({ page }).include('#waitlist').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice']).analyze();
  expect(confirmation.violations).toEqual([]);
});
