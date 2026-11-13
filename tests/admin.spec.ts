import AxeBuilder from '@axe-core/playwright';
import { test, expect } from './helpers';

const payload = {
  totalSignups: 1, totalReferredSignups: 0, topReferrerEmail: null,
  rows: [{ email: 'founder@example.com', referralCode: 'AER-1234ABCD', referredBy: null, source: 'landing', utmSource: null, utmMedium: null, utmCampaign: null, utmContent: null, createdAt: '2026-11-13T00:00:00.000Z', referralCount: 0 }],
};

for (const width of [390, 1440]) {
  test(`admin reports refresh failures, recovers, and clears the view on sign out at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    let fail = false;
    await page.route('**/api/waitlist-admin', route => route.fulfill(fail
      ? { status: 502, json: { error: 'waitlist_admin_unavailable' } }
      : { json: payload }));
    await page.goto('/admin/waitlist');
    await page.getByLabel('Admin password').fill('test-password');
    await page.getByRole('button', { name: 'View founder list' }).click();
    await expect(page.getByRole('cell', { name: 'founder@example.com', exact: true })).toBeVisible();
    await expect(page.getByText('Signups shown', { exact: true })).toBeVisible();
    await expect(page.getByText(/Counts and referral totals cover only the latest 500 signups/)).toBeVisible();
    fail = true;
    await page.getByRole('button', { name: 'Refresh', exact: true }).click();
    await expect(page.getByRole('alert')).toContainText('previous list is still shown');
    await expect(page.getByRole('cell', { name: 'founder@example.com', exact: true })).toBeVisible();
    fail = false;
    await page.getByRole('button', { name: 'Refresh', exact: true }).click();
    await expect(page.getByRole('status')).toContainText('List refreshed');
    await expect(page.getByRole('alert')).toHaveCount(0);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice']).analyze();
    expect(results.violations).toEqual([]);
    await page.getByRole('button', { name: 'Sign out', exact: true }).click();
    await expect(page.getByLabel('Admin password')).toHaveValue('');
    await expect(page.getByLabel('Admin password')).toBeFocused();
    await expect(page.getByRole('cell')).toHaveCount(0);
  });
}

test('a rejected admin password clears stale private rows and returns to login', async ({ page }) => {
  let status = 200;
  await page.route('**/api/waitlist-admin', route => route.fulfill({ status, json: status === 200 ? payload : { error: 'unauthorized' } }));
  await page.goto('/admin/waitlist');
  await page.getByLabel('Admin password').fill('test-password');
  await page.getByRole('button', { name: 'View founder list' }).click();
  await expect(page.getByRole('table')).toBeVisible();
  status = 401;
  await page.getByRole('button', { name: 'Refresh', exact: true }).click();
  await expect(page.getByLabel('Admin password')).toHaveValue('');
  await expect(page.getByRole('alert')).toContainText('Password was not accepted');
  await expect(page.getByRole('table')).toHaveCount(0);
});

test('malformed admin responses leave a usable login instead of crashing React', async ({ page }) => {
  let data: unknown = { rows: null };
  await page.route('**/api/waitlist-admin', route => route.fulfill({ json: data }));
  await page.goto('/admin/waitlist');
  await page.getByLabel('Admin password').fill('test-password');
  for (const invalid of [{ rows: null }, { ...payload, rows: [{ ...payload.rows[0], source: {} }] }]) {
    data = invalid;
    await page.getByRole('button', { name: 'View founder list' }).click();
    await expect(page.getByRole('alert')).toContainText('could not be loaded');
    await expect(page.getByRole('button', { name: 'View founder list' })).toBeEnabled();
  }
});

test('an admin request that never responds times out and allows another attempt', async ({ page }) => {
  await page.clock.install();
  await page.route('**/api/waitlist-admin', () => { /* Simulate a stalled local response. */ });
  await page.goto('/admin/waitlist');
  await page.getByLabel('Admin password').fill('test-password');
  await page.getByRole('button', { name: 'View founder list' }).click();
  await expect(page.getByRole('button', { name: 'View founder list' })).toBeDisabled();
  await page.clock.fastForward(15000);
  await expect(page.getByRole('alert')).toContainText('could not be loaded');
  await expect(page.getByRole('button', { name: 'View founder list' })).toBeEnabled();
});

test('signing out during a refresh does not let a late response restore private rows', async ({ page }) => {
  await page.route('**/api/waitlist-admin', route => route.fulfill({ json: payload }));
  await page.goto('/admin/waitlist');
  await page.getByLabel('Admin password').fill('test-password');
  await page.getByRole('button', { name: 'View founder list' }).click();
  await expect(page.getByRole('table')).toBeVisible();
  let finishResponse: () => Promise<void>;
  await page.route('**/api/waitlist-admin', route => {
    finishResponse = () => route.fulfill({ json: payload }).catch(() => {});
  });
  await page.getByRole('button', { name: 'Refresh', exact: true }).click();
  await expect.poll(() => Boolean(finishResponse)).toBe(true);
  await page.getByRole('button', { name: 'Sign out', exact: true }).click();
  await finishResponse!();
  await expect(page.getByLabel('Admin password')).toHaveValue('');
  await expect(page.getByRole('table')).toHaveCount(0);
});
