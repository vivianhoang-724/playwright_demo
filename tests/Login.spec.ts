import { test } from '@playwright/test'
import { LoginPage } from '../page-object/LoginPage'

test('successful login', async ({ page }) => {

  const loginPage = new LoginPage(page)
  await loginPage.gotoLoginPage()


  await loginPage.login(
    'abc1@test.com',
    'Password1234@'
  )
  await loginPage.verifyLoginSuccess()

})