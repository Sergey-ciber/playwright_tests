import { Page, Locator, expect } from '@playwright/test';

// Страница документации
export class DocsPage {
  readonly page: Page;
  readonly docsUrl = 'https://playwright.dev/docs/intro';

  // Локаторы элементов страницы документации
  private readonly _sidebar: Locator;
  private readonly sidebarLinks: Locator;
  private readonly pageTitle: Locator;
  private readonly codeBlocks: Locator;
  private readonly tableOfContents: Locator;

  constructor(page: Page) {
    this.page = page;
    this._sidebar = page.locator('#__docusaurus_skipToContent_fallback aside nav');
    this.sidebarLinks = this._sidebar.locator('a');
    this.pageTitle = page.locator('h1').first();
    this.codeBlocks = page.locator('pre code');
    this.tableOfContents = page.locator('details[open], .table-of-contents, nav[aria-label="On this page"]');
  }

  get sidebar(): Locator {
    return this._sidebar;
  }

  // Проверить, что мы на странице документации
  async isOnDocsPage(): Promise<boolean> {
    return this.page.url().includes('/docs/');
  }

  // Получить заголовок страницы
  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent();
  }

  // Получить sidebar
  async getSidebar(): Promise<Locator> {
    return this._sidebar;
  }

  // Получить количество ссылок в боковой панели
  async getSidebarLinkCount(): Promise<number> {
    await expect(this.sidebarLinks.first()).toBeVisible();
    return await this.sidebarLinks.count();
  }

  // Получить все ссылки боковой панели
  async getAllSidebarLinks(): Promise<{ text: string; href: string }[]> {
    const count = await this.sidebarLinks.count();
    const links: { text: string; href: string }[] = [];
    for (let i = 0; i < count; i++) {
      const text = (await this.sidebarLinks.nth(i).textContent())?.trim() ?? '';
      const href = (await this.sidebarLinks.nth(i).getAttribute('href')) ?? '';
      if (text) links.push({ text, href });
    }
    return links;
  }

  // Получить количество блоков кода
  async getCodeBlockCount(): Promise<number> {
    return await this.codeBlocks.count();
  }

  // Проверить наличие оглавления
  async hasTableOfContents(): Promise<boolean> {
    return await this.tableOfContents.isVisible().catch(() => false);
  }
}
