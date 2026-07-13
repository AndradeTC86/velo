import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', async () => {

    test.beforeEach(async ({ page }) => {
        // Arrange 
        await page.goto('http://localhost:5173/')
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

        await page.getByRole('link', { name: 'Consultar Pedido' }).click()
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
    })

    test('deve consultar um pedido aprovado', async ({ page }) => {
        // Test Data
        const order = 'VLO-JZURBQ'
    
        // Act    
        await page.getByLabel('Número do Pedido').fill(order)    
        await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        // Assert
        await expect(page.getByTestId(`order-result-${order}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order}
            - img
            - text: APROVADO
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: Midnight Black
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: aero Wheels
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: Motorista de Fuga
            - paragraph: Email
            - paragraph: driver@mailinator.com
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: À Vista
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
        `)
    })

    test('deve exibir mensagem quando o pedido não é encontrado', async ({ page })=> {
        // Test Data
        const order = generateOrderCode()    
        
        // Act    
        await page.getByLabel('Número do Pedido').fill(order)    
        await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        // Assert
        await expect(page.locator('#root')).toMatchAriaSnapshot(`
        - img
        - heading "Pedido não encontrado" [level=3]
        - paragraph: Verifique o número do pedido e tente novamente
        `)
    })
})

