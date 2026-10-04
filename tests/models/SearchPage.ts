import { Page, Locator } from '@playwright/test';

// Страница поиска
export class SearchPage {
  readonly page: Page;

  // Локаторы элементов поиска
  private readonly searchButton: Locator;
  private readonly searchInput: Locator;
  private readonly searchResults: Locator;
  private readonly searchOverlay: Locator;
  private readonly searchCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchButton = page.getByRole('button', { name: 'Search (Control+k)' });
    this.searchInput = page.locator('input[placeholder="Search"]');
    this.searchResults = page.locator('[role="listbox"], [data-testid="search-results"]');
    this.searchOverlay = page.locator('[data-testid="search-overlay"], [role="dialog"], .search-overlay, .DocSearch-Container');
    this.searchCloseButton = page.getByRole('button', { name: 'Close', exact: true }).first();
  }

  // Открыть поиск
  async openSearch() {
    await this.searchButton.click();
  }

  // Ввести поисковый запрос
  async typeQuery(query: string) {
    await this.searchInput.fill(query);
  }

  // Получить результаты поиска
  async getSearchResults(): Promise<string[]> {
    const items = this.searchResults.locator('li, [role="option"], a');
    const count = await items.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await items.nth(i).textContent();
      if (text?.trim()) texts.push(text.trim());
    }
    return texts;
  }

  // Проверить, открыт ли поиск
  async isSearchOpen(): Promise<boolean> {
    return await this.searchOverlay.isVisible({ timeout: 3000 }).catch(() => false);
  }

  // Закрыть поиск
  async closeSearch() {
    if (await this.isSearchOpen()) {
      await this.searchCloseButton.click();
    }
  }

  // Нажать Escape
  async pressEscape() {
    await this.page.keyboard.press('Escape');
  }

  // Выбрать первый результат
  async selectFirstResult() {
    const first = this.searchResults.locator('a, li').first();
    await first.click();
  }
}
