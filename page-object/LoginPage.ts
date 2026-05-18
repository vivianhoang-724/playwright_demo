import { Page, Locator, expect } from '@playwright/test'

export class LoginPage {

  readonly page: Page
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly signInButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {

    this.page = page

    this.emailInput =
      page.getByPlaceholder('Email')

    this.passwordInput =
      page.getByPlaceholder('Password')

    this.signInButton =
      page.getByRole('button', {
        name: 'Sign in'
      })

    this.errorMessage =
      page.locator('.error-messages')

  }

  async gotoLoginPage() {

    await this.page.goto(
      'https://conduit.bondaracademy.com/login'
    )

  }

  async login(
    email: string,
    password: string
  ) {

    await this.emailInput.fill(email)

    await this.passwordInput.fill(password)

    await this.signInButton.click()

  }

  async verifyLoginSuccess() {

    await expect(this.page.getByRole('link', { name: '  New Article' })).toBeVisible()

  }

  async verifyLoginFailed() {

    await expect(
      this.errorMessage
    ).toBeVisible()

  }

}