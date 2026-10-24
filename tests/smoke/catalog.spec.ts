import {test, expect } from '@playwright/test';

test('catalogue page loads and shows products', {tag: ['@smoke',]}, async ({page}) =>{
    await page.goto('/');
//positive testing to pass
    await expect(page.getByTestId('product-grid')).toBeVisible();
    await expect(page.getByTestId('product-card').first()).toBeVisible();

//negative testing to fail
    // await expect(page.getByTestId('product-gridx')).toBeVisible()
});

