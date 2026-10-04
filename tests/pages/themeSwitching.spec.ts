import { test, expect } from '../fixtures/mainPage';

// Тесты переключения тем
test.describe('Тесты переключения тем', () => {
  test('можно переключаться между светлой и тёмной темами', async ({ mainPage }) => {
    await test.step('Проверить начальную тему system', async () => {
      await mainPage.checkActiveTheme('system');
    });

    await test.step('Переключиться на светлую тему', async () => {
      await mainPage.clickSwitchLightModeButton();
      await mainPage.checkActiveTheme('light');
    });

    await test.step('Переключиться на тёмную тему', async () => {
      await mainPage.clickSwitchLightModeButton();
      await mainPage.checkActiveTheme('dark');
    });

    await test.step('Вернуться к теме system', async () => {
      await mainPage.clickSwitchLightModeButton();
      await mainPage.checkActiveTheme('system');
    });
  });

  test('переключение темы отражается в атрибуте html', async ({ mainPage }) => {
    await test.step('Установить светлую тему и проверить атрибут', async () => {
      await mainPage.setLightMode('light');
      await expect(mainPage.page.locator('html')).toHaveAttribute('data-theme', 'light');
    });

    await test.step('Установить тёмную тему и проверить атрибут', async () => {
      await mainPage.setLightMode('dark');
      await expect(mainPage.page.locator('html')).toHaveAttribute('data-theme', 'dark');
    });
  });

  test('скриншот соответствует ожидаемой теме', async ({ mainPage }) => {
    await test.step('Проверить скриншот светлой темы', async () => {
      await mainPage.setLightMode('light');
      await mainPage.checkThemeFromScreenshot('light');
    });

    await test.step('Проверить скриншот тёмной темы', async () => {
      await mainPage.setLightMode('dark');
      await mainPage.checkThemeFromScreenshot('dark');
    });
  });
});
