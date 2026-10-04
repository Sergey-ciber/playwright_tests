import { Page, Locator } from '@playwright/test';

// Страница футера
export class FooterPage {
  readonly page: Page;

  // Локаторы элементов футера
  private readonly footer: Locator;
  private readonly footerLinks: Locator;
  private readonly socialLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.footer = page.locator('footer');
    this.footerLinks = this.footer.locator('a');
    this.socialLinks = this.footer.locator('a[rel="noopener"], a:has(svg)');
  }

  // Получить количество ссылок в футере
  async getFooterLinkCount(): Promise<number> {
    return await this.footerLinks.count();
  }

  // Получить все ссылки футера
  async getAllFooterLinks(): Promise<{ text: string; href: string }[]> {
    const count = await this.footerLinks.count();
    const links: { text: string; href: string }[] = [];
    for (let i = 0; i < count; i++) {
      const text = (await this.footerLinks.nth(i).textContent())?.trim() ?? '';
      const href = await this.footerLinks.nth(i).getAttribute('href') ?? '';
      if (text) links.push({ text, href });
    }
    return links;
  }

  // Получить количество социальных ссылок
  async getSocialLinkCount(): Promise<number> {
    return await this.socialLinks.count();
  }

  // Проверить видимость футера
  async isFooterVisible(): Promise<boolean> {
    return await this.footer.isVisible();
  }
}
