import { defineConfig } from '@playwright/test';
import config from './playwright.config';

// Keep Safari-engine coverage optional so the default suite needs only Chromium.
export default defineConfig({
  ...config,
  use: { ...config.use, browserName: 'webkit', launchOptions: {} },
});
