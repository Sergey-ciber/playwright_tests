import { test, expect } from '../fixtures/mainPage';
import { DocsPage } from '../models/DocsPage';

// Тесты навигации по странице документации
test.describe('Тесты навигации по документации', () => {
  test('переход на страницу intro документации', async ({ mainPage }) => {
    const docsPage = new DocsPage(mainPage.page);

    await test.step('Нажать на ссылку Docs', async () => {
      const docsLink = mainPage.page.getByRole('link', { name: 'Docs' });
      await expect(docsLink).toBeVisible();
      await docsLink.click();
    });

    await test.step('Проверить навигацию на страницу документации', async () => {
      await expect(docsPage.isOnDocsPage()).resolves.toBe(true);
    });

    await test.step('Проверить заголовок страницы', async () => {
      const title = await docsPage.getPageTitle();
      expect(title).toBeTruthy();
      expect(title?.toLowerCase()).toContain('playwright');
    });

    await test.step('Проверить видимость боковой панели', async () => {
      const sidebarVisible = await docsPage.sidebar.isVisible();
      // Боковая панель может использовать другую структуру, также проверить nav с role
      const navMenuVisible = await mainPage.page
        .locator('nav[aria-label]')
        .first()
        .isVisible()
        .catch(() => false);
      expect(sidebarVisible || navMenuVisible).toBe(true);
    });

    await test.step('Проверить наличие ссылок в боковой панели', async () => {
      const linkCount = await docsPage.getSidebarLinkCount();
      expect(linkCount).toBeGreaterThan(0);
    });

    await test.step('Проверить наличие блоков кода', async () => {
      const codeBlockCount = await docsPage.getCodeBlockCount();
      expect(codeBlockCount).toBeGreaterThan(0);
    });

    await test.step('Проверить наличие оглавления', async () => {
      const hasToc = await docsPage.hasTableOfContents();
      expect(hasToc).toBe(true);
    });
  });

  test('переход на страницу API документации', async ({ mainPage }) => {
    await test.step('Нажать на ссылку API', async () => {
      const apiLink = mainPage.page.getByRole('link', { name: 'API' });
      await expect(apiLink).toBeVisible();
      await apiLink.click();
    });

    await test.step('Проверить навигацию на API документацию', async () => {
      await expect(mainPage.page).toHaveURL(/\/docs\/api\//);
    });

    await test.step('Проверить наличие контента на странице API', async () => {
      const heading = mainPage.page.locator('h1').first();
      await expect(heading).toBeVisible();
    });

    await test.step('Вернуться на главную страницу', async () => {
      await mainPage.page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });
    });
  });
});
