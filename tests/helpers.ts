import { test as base, expect } from '@playwright/test';

// Browser tests must never reach production APIs, analytics, fonts or links.
export const test = base.extend({
  page: async ({ page }, use) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await use(page);
    expect(errors, 'Uncaught browser errors').toEqual([]);
  },
  context: async ({ context, baseURL }, use) => {
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin !== baseURL) return route.abort();
      if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/_vercel/')) {
        return route.fulfill({ status: 503, contentType: 'application/json', body: '{}' });
      }
      return route.continue();
    });
    await use(context);
  },
});

export { expect } from '@playwright/test';
