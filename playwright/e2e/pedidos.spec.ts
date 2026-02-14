import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'

/// AAA - Arrange(preparar), Act(agir), Assert(verificar)

test.describe('Consulta de pedido', ()=> {

  // test.beforeAll(async () => {
  //   console.log(
  //     'beforeAll: roda uma vez antes de todos os testes.'
  //   )
  // })
  
  // test.afterEach(async () => {
  //   console.log(
  //     'afterEach: roda depois de cada teste.'
  //   )
  // })
  
  // test.afterAll(async () => {
  //   console.log(
  //     'afterAll: roda uma vez depois de todos os testes.'
  //   )
  // })

  test.beforeEach(async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    const order = {
      number: 'VLO-WJLCUB',
      status: 'APROVADO',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Joao Miranda',
        email: 'joao@dev.com'
      },
      payment: 'À Vista'
    }

    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - img
      - text: ${order.status}

      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);
  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    const order = {
      number: 'VLO-PWW1GC',
      status: 'REPROVADO',
      color: 'Glacier Blue',
      wheels: 'sport Wheels',
      customer: {
        name: 'Ramon Dino',
        email: 'ramondino@qa.dev'
      },
      payment: 'À Vista'
    }

    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - img
      - text: ${order.status}

      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
    // Test Data
    const order = generateOrderCode()

    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    // Assert

    // FORMA DE VALIDAR O HTML
    // const title = page.getByRole('heading', {name: 'Pedido não encontrado'})
    // await expect(title).toBeVisible()

    // const message = page.locator('p', {hasText: 'Verifique o número do pedido e tente novamente'})
    // await expect(message).toBeVisible()

    // Validar através do ariaSnapshot (funcionalidade do codegen)
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)
  })
})
