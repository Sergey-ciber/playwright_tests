import { test, expect } from '../fixtures/mainPage';

// Тесты проверки контента
test.describe('Тесты проверки контента', () => {
  test('главный заголовок содержит ожидаемый текст', async ({ mainPage }) => {
    await test.step('Получить и проверить главный заголовок', async () => {
      const headingText = await mainPage.getMainHeadingText();
      expect(headingText).toContain('reliable');
      expect(headingText).toContain('web automation');
    });
  });

  test('страница имеет корректные meta-теги', async ({ mainPage }) => {
    await test.step('Получить и проверить meta-теги', async () => {
      const metas = await mainPage.getMetaTags();
      const titleMeta = metas.find(m => m.name === 'title' || m.name === 'og:title');
      expect(titleMeta).toBeDefined();
      expect(titleMeta?.content.toLowerCase()).toContain('playwright');
    });
  });

  test('заголовок страницы корректен', async ({ mainPage }) => {
    await test.step('Проверить заголовок страницы', async () => {
      await expect(mainPage.page).toHaveTitle(/playwright/i);
    });
  });

  test('секция hero содержит ожидаемый контент', async ({ mainPage }) => {
    await test.step('Проверить элементы секции hero', async () => {
      const heroHeading = mainPage.page.getByRole('heading', { level: 1 });
      await expect(heroHeading).toBeVisible();

      const getStartedBtn = mainPage.page.getByRole('link', { name: 'Get started' });
      await expect(getStartedBtn).toBeVisible();
      await expect(getStartedBtn).toContainText('Get started');
    });
  });
});
