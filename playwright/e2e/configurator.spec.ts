import { test, expect } from '@playwright/test';

test.describe('Configurador do Velô Sprint', () => {
    test('Deve trocar a cor do veículo sem alterar o preço base', async ({ page }) => {
        await page.goto('/configure')
        const car = page.locator('img[alt^="Velô Sprint"]')

        await expect(page.getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()
        await expect(page.getByText('R$ 40.000,00').first()).toBeVisible()
        await expect(car).toHaveAttribute('src', '/src/assets/glacier-blue-aero-wheels.png')

        await page.getByRole('button', { name: 'Midnight Black' }).click()
        await expect(page.getByText('R$ 40.000,00').first()).toBeVisible()        
        await expect(car).toHaveAttribute('src', '/src/assets/midnight-black-aero-wheels.png')

        await page.getByRole('button', { name: 'Lunar White' }).click()
        await expect(page.getByText('R$ 40.000,00').first()).toBeVisible()
        await expect(car).toHaveAttribute('src', '/src/assets/lunar-white-aero-wheels.png')
    })

    test('Deve atualizar o preço ao trocar as rodas do veículo', async ({ page }) => {
        await page.goto('/configure')
        const car = page.locator('img[alt^="Velô Sprint"]')

        await expect(page.getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()
        await expect(page.getByText('R$ 40.000,00').first()).toBeVisible()
        await expect(car).toHaveAttribute('src', '/src/assets/glacier-blue-aero-wheels.png')

        await page.getByRole('button', { name: /Sport Wheels/i }).click()
        await expect(page.getByText('R$ 42.000,00').first()).toBeVisible()
        await expect(car).toHaveAttribute('src', '/src/assets/glacier-blue-sport-wheels.png')

        await page.getByRole('button', { name: /Aero Wheels/i }).click()
        await expect(page.getByText('R$ 40.000,00').first()).toBeVisible()
        await expect(car).toHaveAttribute('src', '/src/assets/glacier-blue-aero-wheels.png')
    })
})
