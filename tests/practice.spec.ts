import { test, expect } from '@playwright/test'


test('Search playing cards', async ({ page }) => {
    await page.goto('https://www.qpmarketnetwork.com/')

    await expect(page.getByRole('link', { name: 'Order a Custom Sample' }).first()).toBeVisible()

    await page.getByRole('link', { name: 'Catalog' }).first().dblclick()
    await expect(page.locator('.catalog-products-title')).toContainText('Custom Card Decks')

    await page.getByText('Playing Cards').first().click()

    await page.locator('.search-input').fill('Playing Cards')
    await page.locator('.search-input-icon').click()
    await expect(page.locator('.product__name').first()).toContainText('Playing Cards')


    const nextPageButton = page.locator('a[ng-click="selectPage(page + 1, $event)"]')
    if (await nextPageButton.isEnabled()) {
        await nextPageButton.click()
        await expect(page.locator('.product__name').first()).toContainText('Playing Cards')
    }
})

test('Search ', async ({ page }) => {

    await page.goto('https://www.qpmarketnetwork.com')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('h1')).toContainText('The Print-on-Demand Engine')
    await page.getByText('Catalog').first().dblclick()
    await expect(page).toHaveURL(/customize/)
    await page.locator('.search-input').fill('Round Corner Booster Pack Cards (2.48" x 3.46")')

    await page.locator('.search-input-icon').click()

    await expect(page.locator('.product__name').first()).toContainText('Round Corner Booster Pack Cards')
})