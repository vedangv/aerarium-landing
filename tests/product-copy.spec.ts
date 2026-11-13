import { test, expect } from './helpers';

for (const width of [390, 1440]) {
  test(`the hero explains the iPhone app with one download action at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    const hero = page.locator('#hero');
    await expect(hero.getByRole('heading', { level: 1 })).toHaveText('See what youactually own.');
    await expect(hero.getByText(/all in one iPhone app/)).toBeVisible();
    await expect(hero.getByRole('link')).toHaveCount(1);
    await expect(hero.getByRole('link')).toHaveAttribute('href', 'https://apps.apple.com/app/aerarium/id6760155168');
    await expect(hero.getByText('Free to download · Premium US$7.99/month')).toBeVisible();
    await expect(hero.getByText('Brokerage sync requires Premium.')).toBeVisible();
  });
}
