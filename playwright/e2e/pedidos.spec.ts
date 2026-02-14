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

    // Test Data
    const order = 'VLO-WJLCUB'

    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    // Assert
    const orderCode = page.locator(`//p[text()='Pedido']/..//p[text()='${order}']`)
    await expect(orderCode).toBeVisible({ timeout: 10000 })

    await expect(page.getByText('APROVADO')).toBeVisible()
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