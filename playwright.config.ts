import { defineConfig, devices } from '@playwright/test'

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {

    headless: false,

    trace: 'on-first-retry',

  },

  projects: [

    // Setup project
    {
      name: 'setup',

      testMatch: /.*\.setup\.ts/,
    },

    // Chromium project
    {
      name: 'chromium',

      use: {

        ...devices['Desktop Chrome'],

        storageState:
          'playwright/.auth/user.json',

      },

      dependencies: ['setup'],
    },

    // Firefox
    {
      name: 'firefox',

      use: {

        ...devices['Desktop Firefox'],

        storageState:
          'playwright/.auth/user.json',

      },

      dependencies: ['setup'],
    },

    // Webkit
    {
      name: 'webkit',

      use: {

        ...devices['Desktop Safari'],

        storageState:
          'playwright/.auth/user.json',

      },

      dependencies: ['setup'],
    },

  ],

})