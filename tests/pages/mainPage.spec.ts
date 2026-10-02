import { expect, Locator, Page, test } from '@playwright/test';
import { MainPage } from '../models/MainPage';

// Темы для Light мода
const themes = ['dark', 'light'];

//Создание группы тестов
test.describe('Тесты главной страницы', () => {
  //Хук для открытия страницы
  test.beforeEach(async ({ page }) => {
    // await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });
  });

  // Проверка отображения элементов навигации
  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await mainPage.checkElementsVisibility();
  });

  // Проверка названия элементов навигации
  test('Проверка названия элементов навигации хедера', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await mainPage.checkElementsName();
  });

  // Проверка ссылок элементов навигации
  test('Проверка ссылок элементов навигации', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await mainPage.checkElementsHref();
  });

  // Проверка переключения light мода
  test('Проверка переключения light мода', async ({ page }) => {
    const themes: string[] = ['system', 'light', 'dark'];
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();

    for (const thema of themes) {
      await mainPage.checkActiveTheme(thema);
      await mainPage.clickSwitchLightModeButton();
    }
  });

  // Проверка темы на скриншоте
  test('Проверка темы на скриншоте', async ({ page }) => {
    const themes: string[] = ['light', 'dark'];
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    for (const theme of themes) {
      await mainPage.setLightMode(theme);
      await mainPage.checkThemeFromScreenshot(theme);
    }
  });

  test('Проверка заголовка', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText(
      'Playwright enables reliable web automation for testing, scripting, and AI agents.'
    );
  });

  test('Проверка кнопки Get started', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();

    await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');

    await expect.soft(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '/docs/intro');
  });

  // Проверка Light мода
  themes.forEach((value) => {
    test(`Проверка ${value} мода`, async ({ page }) => {
      await page.evaluate((value) => {
        document.querySelector('html')?.setAttribute('data-theme', value);
      }, value);
      await expect(page).toHaveScreenshot(`${value}Mode.png`);
    });
  });
});
