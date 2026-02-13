import { test, expect } from '@playwright/test'

/// AAA - Arrange(preparar), Act(agir), Assert(verificar)

test('deve consultar um pedido aprovado', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill("VLO-WJLCUB")
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()

  // Assert
  const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-WJLCUB"]')
  await expect(orderCode).toBeVisible({ timeout: 10000 })

  await expect(page.getByText('APROVADO')).toBeVisible()
})