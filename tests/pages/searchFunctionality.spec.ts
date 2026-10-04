import { test, expect } from '../fixtures/mainPage';
import { SearchPage } from '../models/SearchPage';

// Тесты функциональности поиска
test.describe('Тесты функциональности поиска', () => {
  test('оверлей поиска открывается и закрывается', async ({ mainPage }) => {
    const search = new SearchPage(mainPage.page);

    await test.step('Открыть поиск', async () => {
      await search.openSearch();
      await expect(search.isSearchOpen()).resolves.toBe(true);
    });

    await test.step('Закрыть поиск через Escape', async () => {
      await search.pressEscape();
      await expect(search.isSearchOpen()).resolves.toBe(false);
    });
  });

  test('поиск возвращает результаты по запросу', async ({ mainPage }) => {
    const search = new SearchPage(mainPage.page);

    await test.step('Открыть поиск и ввести запрос', async () => {
      await search.openSearch();
      await search.typeQuery('get started');
    });

    await test.step('Проверить появление результатов поиска', async () => {
      const results = await search.getSearchResults();
      expect(results.length).toBeGreaterThan(0);
    });

    await test.step('Закрыть поиск', async () => {
      await search.closeSearch();
    });
  });

  test('поиск работает для разных запросов', async ({ mainPage }) => {
    const search = new SearchPage(mainPage.page);
    const queries = ['api', 'locator', 'page object'];

    for (const query of queries) {
      await test.step(`Поиск по запросу "${query}"`, async () => {
        await search.openSearch();
        await search.typeQuery(query);
        const results = await search.getSearchResults();
        expect(Array.isArray(results)).toBe(true);
        await search.closeSearch();
      });
    }
  });
});
