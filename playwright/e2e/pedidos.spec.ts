import { test, expect } from '../support/fixtures'
import { generateOrderCode } from '../support/helpers'
import { OrderDetails } from '../support/actions/orderLookupActions'

test.describe('Consulta de Pedido', () => {
  test.beforeEach(async ({ app }) => {
    await app.orderLookup.open()
  })

  test('deve consultar um pedido aprovado', async ({ app }) => {
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
    await app.orderLookup.searchOrder(order.number)
    await app.orderLookup.validateOrderDetails(order)
    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido reprovado', async ({ app }) => {
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
    await app.orderLookup.searchOrder(order.number)
    await app.orderLookup.validateOrderDetails(order)
    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido que está em análise', async ({ app }) => {
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
    await app.orderLookup.searchOrder(order.number)
    await app.orderLookup.validateOrderDetails(order)
    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {
    const order = generateOrderCode()
    await app.orderLookup.searchOrder(order)
    await app.orderLookup.validateOrderNotFound()
  })

  test('deve exibir mensagem quando busca por pedido em formato inválido', async ({ app }) => {
    await app.orderLookup.searchOrder('ABC-9999-??')
    await app.orderLookup.validateOrderNotFound()
  })
})

