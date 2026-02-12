import { test, expect } from '@playwright/test'

/// AAA - Arrange(preparar), Act(agir), Assert(verificar)

test('deve consultar um pedido aprovado', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  const orderId = 'VLO-WJLCUB';
  const orderStatus = 'APROVADO';

  // Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(orderId);
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()

  // Assert
  await expect(page.getByTestId(`order-result-${orderId}`)).toBeVisible({ timeout: 10000 })
  await expect(page.getByTestId(`order-result-${orderId}`)).toContainText(orderId);
  
  await expect(page.getByTestId(`order-result-${orderId}`)).toBeVisible({ timeout: 10000 })
  await expect(page.getByTestId(`order-result-${orderId}`)).toContainText(orderStatus);
})