import { test, expect } from '@playwright/test'

/// AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {
    
    // Test Data
    const order = 'VLO-JZURBQ'
    
    // Arrange 
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

    // Act    
    await page.getByLabel('Número do Pedido').fill(order)    
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    // Assert
    await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 10_000})
    await expect(page.getByTestId('order-result-id')).toContainText(order)

    await expect(page.getByTestId('order-result-status')).toBeVisible()
    await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
})