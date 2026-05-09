import { test, expect } from '@playwright/test'

/// AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {
    
    /// Arrange 
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

    /// Act    
    await page.getByLabel('Número do Pedido').fill('VLO-JZURBQ')    
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    /// Assert
    await expect(page.locator('div .font-mono')).toBeVisible({timeout: 10_000})
    await expect(page.locator('div .font-mono')).toContainText('VLO-JZURBQ')

    await expect(page.locator('div .bg-green-100')).toBeVisible()
    await expect(page.locator('div .bg-green-100')).toContainText('APROVADO')
})