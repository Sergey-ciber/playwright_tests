import { expect, Locator, Page, test } from '@playwright/test';

// Интерфейс для создания объектов с типом element
interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

// Создаем класс MainPage
export class MainPage {
  readonly page: Page;
  readonly elements: Elements[];

  // Создаем конструктор
  constructor(page: Page) {
    this.page = page;
    this.elements = [
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Playwright logo Playwright' }),
        name: 'Playwright logo link',
        text: 'Playwright',
        attribute: {
          type: 'href',
          value: '/',
        },
      },

      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
        name: 'Docs link',
        text: 'Docs',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },

      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'MCP', exact: true }),
        name: 'MCP link',
        text: 'MCP',
        attribute: {
          type: 'href',
          value: '/mcp/introduction',
        },
      },

      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'CLI', exact: true }),
        name: 'CLI link',
        text: 'CLI',
        attribute: {
          type: 'href',
          value: '/agent-cli/introduction',
        },
      },

      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
        name: 'API link',
        text: 'API',
        attribute: {
          type: 'href',
          value: '/docs/api/class-playwright',
        },
      },

      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
        name: 'Node.js button',
      },

      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
        name: 'GitHub repository link',
        attribute: {
          type: 'href',
          value: 'https://github.com/microsoft/playwright',
        },
      },

      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
        name: 'Discord server link',
        attribute: {
          type: 'href',
          value: 'https://aka.ms/playwright/discord',
        },
      },

      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Switch between dark and light' }),
        name: 'Switch between dark and light button',
      },

      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Control+k)' }),
        name: 'Search (Control+k) button',
      },

      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Switch between dark and light' }),
        name: 'Switch between dark and light',
      },

      {
        locator: (page: Page): Locator => page.locator('html'),
        name: 'HTML',
        attribute: {
          type: 'data-theme-choice',
          value: 'system',
        },
      },

      {
        locator: (page: Page): Locator => page.getByRole('heading', { name: 'Playwright enables reliable' }),
        name: 'Title',
        text: 'Playwright enables reliable web automation for testing, scripting, and AI agents.',
      },

      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
        name: 'Get started button',
        text: 'Get started',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
    ];
  }

  // Метод для открытия главной страницы
  async openMainPage() {
    await this.page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });
  }

  // Метод для проверки видимости элементов навигации
  async checkElementsVisibility() {
    for (const { locator, name } of this.elements) {
      await test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect(locator(this.page)).toBeVisible();
      });
    }
  }

  // Метод для проверки названия элементов навигации
  async checkElementsName() {
    for (const element of this.elements) {
      if (element.text) {
        await test.step(`Проверка текста у элемента ${element.name}`, async () => {
          await expect(element.locator(this.page)).toContainText(element.text);
        });
      }
    }
  }

  // Проверка ссылок элементов навигации
  async checkElementsHref() {
    for (const { name, locator, attribute } of this.elements) {
      if (attribute?.type === 'href') {
        await test.step(`Проверка ссылки элемента ${name}`, async () => {
          await expect(locator(this.page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    }
  }

  // Нажатие на переключатель темы
  async clickSwitchLightModeButton() {
    await test.step('Нажатие на переключатель темы', async () => {
      await this.page.getByRole('button', { name: 'Switch between dark and light' }).click();
    });
  }

  // Проверка активной темы
  async checkActiveTheme(activeTheme: string) {
    await test.step(`Проверка активации темы ${activeTheme}`, async () => {
      await expect(this.page.locator('html')).toHaveAttribute('data-theme-choice', activeTheme);
    });
  }

  // Установка light / dark мода
  async setLightMode(theme: string) {
    await test.step(`Установка ${theme} мода`, async () => {
      await this.page.evaluate((mode) => {
        document.querySelector('html').setAttribute('data-theme', mode);
      }, theme);
    });
  }

  // Проверка темы на скриншоте
  async checkThemeFromScreenshot(theme: string) {
    await test.step(`Проверка ${theme} темы на скриншоте`, async () => {
      await expect(this.page).toHaveScreenshot(`${theme}Mode.png`);
    });
  }
}
