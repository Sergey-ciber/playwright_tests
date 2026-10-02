import { test, expect } from '../fixtures/mainPage';

//Создание группы тестов
test.describe('Тесты главной страницы', () => {
  // Проверка отображения элементов навигации
  test('Проверка отображения элементов навигации хедера', async ({ mainPage }) => {
    await mainPage.checkElementsVisibility();
  });

  // Проверка названия элементов навигации
  test('Проверка названия элементов навигации хедера', async ({ mainPage }) => {
    await mainPage.checkElementsName();
  });

  // Проверка ссылок элементов навигации
  test('Проверка ссылок элементов навигации', async ({ mainPage }) => {
    await mainPage.checkElementsHref();
  });

  // Проверка переключения light мода
  test('Проверка переключения light мода', async ({ mainPage }) => {
    const themes: string[] = ['system', 'light', 'dark'];

    for (const thema of themes) {
      await mainPage.checkActiveTheme(thema);
      await mainPage.clickSwitchLightModeButton();
    }
  });

  // Проверка темы на скриншоте
  test('Проверка темы на скриншоте', async ({ mainPage }) => {
    const themes: string[] = ['light', 'dark'];
    for (const theme of themes) {
      await mainPage.setLightMode(theme);
      await mainPage.checkThemeFromScreenshot(theme);
    }
  });
});
