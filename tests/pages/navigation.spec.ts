import { test, expect } from '../fixtures/mainPage';

// Тесты навигации
test.describe('Тесты навигации', () => {
  test('все ссылки навигации видимы и имеют корректные href', async ({ mainPage }) => {
    await test.step('Проверить видимость элементов навигации', async () => {
      await mainPage.checkElementsVisibility();
    });

    await test.step('Проверить текстовое содержание элементов навигации', async () => {
      await mainPage.checkElementsName();
    });

    await test.step('Проверить атрибуты href элементов навигации', async () => {
      await mainPage.checkElementsHref();
    });
  });

  test('ссылки навигации ведут на правильные страницы', async ({ mainPage }) => {
    const links = await mainPage.getNavigationLinks();

    await test.step('Проверить ссылку Docs', async () => {
      const docsLink = links.find(l => l.name === 'Docs');
      expect(docsLink).toBeDefined();
      expect(docsLink?.href).toBe('/docs/intro');
    });

    await test.step('Проверить ссылку API', async () => {
      const apiLink = links.find(l => l.name === 'API');
      expect(apiLink).toBeDefined();
      expect(apiLink?.href).toBe('/docs/api/class-playwright');
    });

    await test.step('Проверить ссылку GitHub', async () => {
      const githubLink = links.find(l => l.name.toLowerCase().includes('github'));
      expect(githubLink).toBeDefined();
      expect(githubLink?.href).toContain('github.com');
    });
  });

  test('кнопка Get started ведет на документацию', async ({ mainPage }) => {
    await test.step('Проверить кнопку Get started', async () => {
      const getStarted = mainPage.page.getByRole('link', { name: 'Get started' });
      await expect(getStarted).toBeVisible();
      await expect(getStarted).toHaveAttribute('href', '/docs/intro');
      await expect(getStarted).toContainText('Get started');
    });
  });
});
