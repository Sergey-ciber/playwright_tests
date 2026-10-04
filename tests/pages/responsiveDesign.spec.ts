import { test, expect } from '../fixtures/mainPage';

// Тесты адаптивного дизайна
test.describe('Тесты адаптивного дизайна', () => {
  test('макет корректен на десктопе', async ({ mainPage }) => {
    await test.step('Установить размер десктопа', async () => {
      await mainPage.page.setViewportSize({ width: 1920, height: 1080 });
    });

    await test.step('Проверить отсутствие горизонтального скролла', async () => {
      const noOverflow = await mainPage.checkResponsiveLayout(1920, 1080);
      expect(noOverflow).toBe(true);
    });

    await test.step('Проверить видимость основного контента', async () => {
      const heroHeading = mainPage.page.getByRole('heading', { level: 1 });
      await expect(heroHeading).toBeVisible();
    });

    await test.step('Сделать скриншот десктопа', async () => {
      await mainPage.page.screenshot({ path: 'tests/screenshots/responsive_desktop.png' });
    });
  });

  test('макет адаптируется под планшет', async ({ mainPage }) => {
    await test.step('Установить размер планшета', async () => {
      await mainPage.page.setViewportSize({ width: 768, height: 1024 });
    });

    await test.step('Проверить отсутствие горизонтального скролла', async () => {
      const noOverflow = await mainPage.checkResponsiveLayout(768, 1024);
      expect(noOverflow).toBe(true);
    });

    await test.step('Проверить видимость основного контента', async () => {
      const heroHeading = mainPage.page.getByRole('heading', { level: 1 });
      await expect(heroHeading).toBeVisible();
    });

    await test.step('Сделать скриншот планшета', async () => {
      await mainPage.page.screenshot({ path: 'tests/screenshots/responsive_tablet.png' });
    });
  });

  test('макет адаптируется под мобильное устройство', async ({ mainPage }) => {
    await test.step('Установить размер мобильного устройства', async () => {
      await mainPage.page.setViewportSize({ width: 375, height: 667 });
    });

    await test.step('Проверить отсутствие горизонтального скролла', async () => {
      const noOverflow = await mainPage.checkResponsiveLayout(375, 667);
      expect(noOverflow).toBe(true);
    });

    await test.step('Проверить видимость основного контента', async () => {
      const heroHeading = mainPage.page.getByRole('heading', { level: 1 });
      await expect(heroHeading).toBeVisible();
    });

    await test.step('Сделать скриншот мобильного устройства', async () => {
      await mainPage.page.screenshot({ path: 'tests/screenshots/responsive_mobile.png' });
    });
  });
});
