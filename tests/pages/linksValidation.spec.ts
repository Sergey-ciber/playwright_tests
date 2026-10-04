import { test, expect } from '../fixtures/mainPage';

// Тесты валидации ссылок
test.describe('Тесты валидации ссылок', () => {
  test('все внутренние ссылки имеют корректный формат href', async ({ mainPage }) => {
    await test.step('Получить все ссылки', async () => {
      const links = await mainPage.getAllLinks();
      expect(links.length).toBeGreaterThan(0);

      const internalLinks = links.filter((l) => !l.isExternal);
      expect(internalLinks.length).toBeGreaterThan(0);

      for (const link of internalLinks) {
        await test.step(`Проверить внутреннюю ссылку: ${link.text || link.href}`, async () => {
          // Разрешены якорные ссылки, относительные пути и URL playwright.dev
          expect(link.href).toMatch(/^|^\/|^#|^https:\/\/playwright\.dev/);
        });
      }
    });
  });

  test('внешние ссылки ведут на ожидаемые домены', async ({ mainPage }) => {
    await test.step('Получить внешние ссылки', async () => {
      const links = await mainPage.getAllLinks();
      const externalLinks = links.filter((l) => l.isExternal);

      expect(externalLinks.length).toBeGreaterThan(0);

      for (const link of externalLinks) {
        await test.step(`Проверить внешнюю ссылку: ${link.text || link.href}`, async () => {
          const validDomains = [
            'github.com',
            'aka.ms',
            'discord.com',
            'twitter.com',
            'x.com',
            'youtube.com',
            'modelcontextprotocol.io',
            'code.visualstudio.com',
            'bing.com',
            'outlook.com',
            'hotstar.com',
            'accessibilityinsights.io',
            'learn.microsoft.com',
            'stackoverflow.com',
            'x.com/playwrightweb',
            'linkedin.com',
            'dev.to/playwright',
            'go.microsoft.com',
          ];
          const isValid = validDomains.some((domain) => link.href.includes(domain));
          expect(isValid).toBe(true);
        });
      }
    });
  });

  test('ссылки имеют доступный текст', async ({ mainPage }) => {
    test.setTimeout(1200000);
    await test.step('Проверить, что ссылки имеют текст или aria-label', async () => {
      const anchors = await mainPage.page.locator('a[href]').all();

      for (const anchor of anchors) {
        const href = (await anchor.getAttribute('href')) ?? '';
        const text = (await anchor.textContent())?.trim() ?? '';
        const ariaLabel = await anchor.getAttribute('aria-label');
        let image: boolean = false;
        if (await anchor.locator('img').isVisible()) {
          image = true;
        }
        expect
          .soft(
            text.length > 0 || ariaLabel || image,
            `Ссылка ${href} не имеет текста или aria-label или изображения`
          )
          .toBe(true);
      }
    });
  });
});
