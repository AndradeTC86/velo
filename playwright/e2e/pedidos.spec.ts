import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'
import { OrderLookupPage, OrderDetails } from '../support/pages/OrderLookupPage'
import { LandingPage } from '../support/pages/LandingPage'
import { Navbar } from '../support/components/Navbar'

test.describe('Consulta de Pedido', () => {

    let orderLookupPage: OrderLookupPage

    test.beforeEach(async ({ page }) => {
        await new LandingPage(page).goto()
        await new Navbar(page).clickOrderLookupLink()
        orderLookupPage = new OrderLookupPage(page)
        orderLookupPage.validatePageLoaded()
    })

    test('deve consultar um pedido aprovado', async ({ page }) => {
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
        await orderLookupPage.searchOrder(order.number)
        await orderLookupPage.validateOrderDetails(order)
        await orderLookupPage.validateStatusBadge(order.status)
    })

    test('deve consultar um pedido reprovado', async ({ page }) => {
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
        await orderLookupPage.searchOrder(order.number)
        await orderLookupPage.validateOrderDetails(order)
        await orderLookupPage.validateStatusBadge(order.status)
    })

    test('deve consultar um pedido que está em análise', async ({ page }) => {
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
        await orderLookupPage.searchOrder(order.number)
        await orderLookupPage.validateOrderDetails(order)
        await orderLookupPage.validateStatusBadge(order.status)
    })

    test('deve exibir mensagem quando o pedido não é encontrado', async ({ page })=> {
        const order = generateOrderCode()        
        await orderLookupPage.searchOrder(order)
        await orderLookupPage.validateOrderNotFound()
    })

    test('deve exibir mensagem quando busca por pedido em formato inválido', async ({ page })=> {        
        await orderLookupPage.searchOrder('ABC-9999-??')
        await orderLookupPage.validateOrderNotFound()
    })
})

