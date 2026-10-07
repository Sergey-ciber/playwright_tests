import { test } from '../fixtures/boardsPage';

test.describe('Тесты страницы с досками', () => {
  test('Проверка видимости основных элементов на странице', async ({ boardsPage }) => {
    await boardsPage.checkVisibleElements();
  });
});
