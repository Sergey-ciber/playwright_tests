import { test, expect } from '../fixtures/mainPage';

// Тесты интерактивных элементов
test.describe('Тесты интерактивных элементов', () => {
  test('кнопка Node.js видна и активна', async ({ mainPage }) => {
    await test.step('Проверить видимость кнопки Node.js', async () => {
      const nodeBtn = mainPage.page.getByRole('button', { name: 'Node.js' });
      await expect(nodeBtn).toBeVisible();
    });

    await test.step('Проверить активность кнопки Node.js', async () => {
      const nodeBtn = mainPage.page.getByRole('button', { name: 'Node.js' });
      await expect(nodeBtn).toBeEnabled();
    });
  });

  test('кнопка поиска открывает оверлей', async ({ mainPage }) => {
    await test.step('Нажать на кнопку поиска', async () => {
      const searchBtn = mainPage.page.getByRole('button', { name: 'Search (Control+k)' });
      await expect(searchBtn).toBeVisible();
      await searchBtn.click();
    });

    await test.step('Проверить видимость оверлея поиска', async () => {
      await expect(mainPage.page.locator('[data-testid="search-overlay"], [role="dialog"], .DocSearch-Container')).toBeVisible({ timeout: 5000 });
    });

    await test.step('Закрыть оверлей поиска', async () => {
      await mainPage.page.keyboard.press('Escape');
    });
  });

  test('поиск можно открыть через горячую клавишу', async ({ mainPage }) => {
    await test.step('Нажать Ctrl+K для открытия поиска', async () => {
      await mainPage.page.keyboard.press('Control+k');
    });

    await test.step('Проверить видимость оверлея поиска', async () => {
      await expect(mainPage.page.locator('[data-testid="search-overlay"], [role="dialog"], .DocSearch-Container')).toBeVisible({ timeout: 5000 });
    });

    await test.step('Закрыть поиск через Escape', async () => {
      await mainPage.page.keyboard.press('Escape');
      await expect(mainPage.page.locator('[data-testid="search-overlay"], [role="dialog"], .DocSearch-Container')).toBeHidden({ timeout: 3000 });
    });
  });
});
