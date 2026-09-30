import { expect, test } from '@playwright/test';

// Вынос локаторов в отдельный массив объектов
const elements = [
  {
    locator: (page) => page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo link',
    text: 'Playwright',
    attribute: {
      type: 'href',
      value: '/',
    },
  },

  {
    locator: (page) => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
    text: 'Docs',
    attribute: {
      type: 'href',
      value: '/docs/intro',
    },
  },

  {
    locator: (page) => page.getByRole('link', { name: 'MCP', exact: true }),
    name: 'MCP link',
    text: 'MCP',
    attribute: {
      type: 'href',
      value: '/mcp/introduction',
    },
  },

  {
    locator: (page) => page.getByRole('link', { name: 'CLI', exact: true }),
    name: 'CLI link',
    text: 'CLI',
    attribute: {
      type: 'href',
      value: '/agent-cli/introduction',
    },
  },

  {
    locator: (page) => page.getByRole('link', { name: 'API' }),
    name: 'API link',
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright',
    },
  },

  {
    locator: (page) => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js button',
  },

  {
    locator: (page) => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub repository link',
    attribute: {
      type: 'href',
      value: 'https://github.com/microsoft/playwright',
    },
  },

  {
    locator: (page) => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord server link',
    attribute: {
      type: 'href',
      value: 'https://aka.ms/playwright/discord',
    },
  },

  {
    locator: (page) => page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Switch between dark and light button',
  },

  {
    locator: (page) => page.getByRole('button', { name: 'Search (Control+k)' }),
    name: 'Search (Control+k) button',
  },
];

//Создание группы тестов
test.describe('Тесты главной страницы', () => {
  //Хук для открытия страницы
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });
  });

  // Проверка отображения элементов навигации
  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect(locator(page)).toBeVisible();
      });
    });
  });

  // Проверка названия элементов навигации
  test('Проверка названия элементов навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`Проверка названия элемента ${name}`, async () => {
          await expect(locator(page)).toContainText(text);
        });
      }
    });
  });

  // Проверка ссылок элементов навигации
  test('Проверка ссылок элементов навигации', async ({ page }) => {
    elements.forEach(({ locator, name, attribute }) => {
      if (attribute) {
        test.step(`Проверка ссылки элемента ${name}`, async () => {
          await expect(locator(page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    });
  });

  test('Проверка light мода', async ({ page }) => {
    await page.getByRole('button', { name: 'Switch between dark and light' }).click();

    await expect(page.locator('html')).toHaveAttribute('data-theme-choice', 'light');

    await page.getByLabel('Switch between dark and light').click();

    await expect(page.locator('html')).toHaveAttribute('data-theme-choice', 'dark');

    await page.getByLabel('Switch between dark and light').click();

    await expect(page.locator('html')).toHaveAttribute('data-theme-choice', 'system');
  });

  test('Проверка заголовка', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText(
      'Playwright enables reliable web automation for testing, scripting, and AI agents.'
    );
  });

  test('Проверка кнопки Get started', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();

    await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');

    await expect.soft(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '/docs/intro');
  });
});
