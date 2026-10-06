import { expect, test } from '@playwright/test';

test.describe('Тесты главной страницы Канбано', () => {
  test('Проверка отображения и названия созданной доски', async ({ page }) => {
    await page.goto('https://app.kanbano.ru/boards');
    await test.step('Проверка видимости элемента с названием доски', async () => {
      await expect(page.getByRole('heading', { name: 'Супер доска' })).toBeVisible();
    });

    await test.step('Проверка текста элемента с названием доски', async () => {
      await expect(page.getByRole('heading', { name: 'Супер доска' })).toHaveText('Супер доска');
    });
  });
});
