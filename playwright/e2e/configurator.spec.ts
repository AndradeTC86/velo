import { test, expect } from '@playwright/test';

test.describe('Configurador do Velô Sprint', () => {
    test('CT-02 - deve atualizar o preço ao trocar cor e rodas', async ({ page }) => {
        await page.goto('/configure')

        await expect(page.getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()
        await expect(page.getByText('R$ 40.000,00').first()).toBeVisible()

        await page.getByRole('button', { name: 'Lunar White' }).click()
        await expect(page.getByText('R$ 40.000,00').first()).toBeVisible()

        await page.getByRole('button', { name: /Sport Wheels/i }).click()
        await expect(page.getByText('R$ 42.000,00').first()).toBeVisible()

        await page.getByRole('button', { name: /Aero Wheels/i }).click()
        await expect(page.getByText('R$ 40.000,00').first()).toBeVisible()
    })
})
