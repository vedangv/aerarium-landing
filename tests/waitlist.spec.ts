import { test, expect } from './helpers';

const savedUser = {
  email: 'test@example.com', registeredAt: '2026-11-13T00:00:00.000Z',
  ticketNumber: 'AER-1234ABCD', referralCode: 'AER-1234ABCD', referralCount: 0,
};

test.use({ viewport: { width: 390, height: 844 } });

test('denied storage access does not crash the landing page', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new DOMException('Storage blocked', 'SecurityError'); };
  });
  await page.goto('/');
  await expect(page.locator('#input-waitlist-email')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('malformed saved signup data is ignored', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('aerarium_registered_user', '{}'));
  await page.goto('/');
  await expect(page.locator('#input-waitlist-email')).toBeVisible();
});

test('a completed signup still succeeds when browser storage cannot be written', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => { throw new DOMException('Storage full', 'QuotaExceededError'); };
  });
  let posted: Record<string, string> | undefined;
  await page.route('**/api/waitlist', route => {
    posted = route.request().postDataJSON();
    return route.fulfill({ json: savedUser });
  });
  await page.goto('/?ref=AER-ABCD1234&utm_source=test&utm_campaign=local');
  await page.locator('#input-waitlist-email').fill('test@example.com');
  await page.locator('#btn-waitlist-submit').click();
  await expect(page.getByRole('heading', { name: "You're on the founder list" })).toBeVisible();
  await expect(page.getByRole('heading', { name: "You're on the founder list" })).toBeFocused();
  expect(posted).toMatchObject({ email: 'test@example.com', referredBy: 'AER-ABCD1234', utmSource: 'test', utmCampaign: 'local' });
});

test('clipboard failure offers manual copying and never claims success', async ({ page }) => {
  await page.addInitScript(user => {
    localStorage.setItem('aerarium_registered_user', JSON.stringify(user));
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('Clipboard denied')) } });
  }, savedUser);
  await page.goto('/');
  await page.getByRole('button', { name: 'Copy', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Copied', exact: true })).toHaveCount(0);
  await expect(page.getByRole('status')).toContainText('Select and copy');
  await expect(page.getByRole('textbox', { name: 'Your referral link' })).toHaveValue(/\?ref=AER-1234ABCD$/);
});

test('rate-limit errors are announced and keep the form available', async ({ page }) => {
  await page.route('**/api/waitlist', route => route.fulfill({ status: 429, json: { error: 'rate_limited' } }));
  await page.goto('/');
  await page.locator('#input-waitlist-email').fill('test@example.com');
  await page.locator('#btn-waitlist-submit').click();
  await expect(page.getByRole('alert')).toContainText('Too many signup attempts');
  await expect(page.getByRole('button', { name: 'Get launch updates' })).toBeEnabled();
});

test('a malformed success response leaves a usable form instead of a broken ticket', async ({ page }) => {
  await page.route('**/api/waitlist', route => route.fulfill({ json: {} }));
  await page.goto('/');
  await page.getByLabel('Email address').fill('test@example.com');
  await page.getByRole('button', { name: 'Get launch updates' }).click();
  await expect(page.getByRole('alert')).toContainText("Couldn't save your signup");
  await expect(page.getByRole('button', { name: 'Get launch updates' })).toBeEnabled();
});

test('a saved signup remains usable when referral statistics are unavailable', async ({ page }) => {
  await page.route('**/api/waitlist', route => route.fulfill({ json: { ...savedUser, alreadyRegistered: true, referralCountUnavailable: true } }));
  await page.goto('/');
  await page.getByLabel('Email address').fill('test@example.com');
  await page.getByRole('button', { name: 'Get launch updates' }).click();
  await expect(page.getByRole('heading', { name: "You're on the founder list" })).toBeVisible();
  await expect(page.getByText('Temporarily unavailable', { exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Your referral link' })).toHaveValue(/\?ref=AER-1234ABCD$/);
  await page.reload();
  await expect(page.getByText('Temporarily unavailable', { exact: true })).toBeVisible();
});
