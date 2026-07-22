import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'
import { OrderLookupPage, OrderDetails } from '../support/pages/ConsultaPedidoPage'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

    test.beforeEach(async ({ page }) => {
        // Arrange 
        await page.goto('http://localhost:5173/')
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

        await page.getByRole('link', { name: 'Consultar Pedido' }).click()
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
    })

    test('deve consultar um pedido aprovado', async ({ page }) => {
        // Test Data
        const order: OrderDetails = {
            number: 'VLO-JZURBQ',
            status: 'APROVADO',
            color: 'Midnight Black',
            wheels: 'aero Wheels',
            customer: {
                name: 'Motorista de Fuga',
                email: 'driver@mailinator.com'
            },
            payment: 'À Vista'
        }
    
        // Act    
        const orderLookupPage = new OrderLookupPage(page)
        await orderLookupPage.searchOrder(order.number)

        // Assert
        await orderLookupPage.validateOrderDetails(order)
        await orderLookupPage.validateStatusBadge(order.status)
    })

    test('deve consultar um pedido reprovado', async ({ page }) => {
        // Test Data
        const order: OrderDetails = {
            number: 'VLO-EJ0BRO',
            status: 'REPROVADO',
            color: 'Lunar White',
            wheels: 'sport Wheels',
            customer: {
                name: 'Motorista Consciente',
                email: 'driver@mailinator.com'
            },
            payment: 'À Vista'
        } 
    
        // Act    
        const orderLookupPage = new OrderLookupPage(page)
        await orderLookupPage.searchOrder(order.number)

        // Assert
        await orderLookupPage.validateOrderDetails(order)
        await orderLookupPage.validateStatusBadge(order.status)
    })

    test('deve consultar um pedido que está em análise', async ({ page }) => {
        // Test Data
        const order: OrderDetails = {
            number: 'VLO-R95VO9',
            status: 'EM_ANALISE',
            color: 'Glacier Blue',
            wheels: 'sport Wheels',
            customer: {
                name: 'Piloto de Fuga',
                email: 'driver@mailinator.com'
            },
            payment: 'À Vista'
        } 
    
        // Act    
        const orderLookupPage = new OrderLookupPage(page)
        await orderLookupPage.searchOrder(order.number)

        // Assert
        await orderLookupPage.validateOrderDetails(order)
        await orderLookupPage.validateStatusBadge(order.status)
    })

    test('deve exibir mensagem quando o pedido não é encontrado', async ({ page })=> {
        // Test Data
        const order = generateOrderCode()    
        
        // Act    
        const orderLookupPage = new OrderLookupPage(page)
        await orderLookupPage.searchOrder(order)

        // Assert
        await orderLookupPage.validateOrderNotFound()
    })

    test('deve exibir mensagem quando o pedido em um formato inválido não é encontrado', async ({ page })=> {        
        // Act    
        const orderLookupPage = new OrderLookupPage(page)
        await orderLookupPage.searchOrder('ABC?')

        // Assert
        await orderLookupPage.validateOrderNotFound()
    })
})

