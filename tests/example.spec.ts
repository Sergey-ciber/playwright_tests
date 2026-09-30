import { expect, test } from "@playwright/test";

// Вынос локаторов в отдельный массив объектов
const elementsLocator = [
  {
    locator: (page) =>
      page.getByRole("link", { name: "Playwright logo Playwright" }),
    name: "Playwright logo link",
  },

  {
    locator: (page) => page.getByRole("link", { name: "Docs" }),
    name: "Docs link",
  },

  {
    locator: (page) => page.getByRole("link", { name: "MCP", exact: true }),
    name: "MCP link",
  },

  {
    locator: (page) => page.getByRole("link", { name: "CLI", exact: true }),
    name: "CLI link",
  },

  {
    locator: (page) => page.getByRole("link", { name: "API" }),
    name: "API link",
  },

  {
    locator: (page) => page.getByRole("button", { name: "Node.js" }),
    name: "Node.js button",
  },

  {
    locator: (page) => page.getByRole("link", { name: "GitHub repository" }),
    name: "GitHub repository link",
  },

  {
    locator: (page) => page.getByRole("link", { name: "Discord server" }),
    name: "Discord server link",
  },

  {
    locator: (page) =>
      page.getByRole("button", { name: "Switch between dark and light" }),
    name: "Switch between dark and light button",
  },

  {
    locator: (page) => page.getByRole("button", { name: "Search (Control+k)" }),
    name: "Search (Control+k) button",
  },
];

//Создание группы тестов
test.describe("Тесты главной страницы", () => {
  //Хук для открытия страницы
  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright.dev/", { waitUntil: "networkidle" });
  });

  test("Проверка отображения элементов навигации хедера", async ({ page }) => {
    elementsLocator.forEach(({ locator, name }) => {
      test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect(locator(page)).toBeVisible();
      });
    });
  });

  //   await test.step("Проверка отображения элемента Playwright logo", async () => {
  //     await expect(
  //       page.getByRole("link", { name: "Playwright logo Playwright" }),
  //     ).toBeVisible();
  //   });
  //
  //   await expect(page.getByRole("link", { name: "Docs" })).toBeVisible();
  //   await expect(
  //     page.getByRole("link", { name: "MCP", exact: true }),
  //   ).toBeVisible();
  //   await expect(
  //     page.getByRole("link", { name: "CLI", exact: true }),
  //   ).toBeVisible();
  //   await expect(page.getByRole("link", { name: "API" })).toBeVisible();
  //   await expect(page.getByRole("button", { name: "Node.js" })).toBeVisible();
  //   await expect(
  //     page.getByRole("link", { name: "GitHub repository" }),
  //   ).toBeVisible();
  //   await expect(
  //     page.getByRole("link", { name: "Discord server" }),
  //   ).toBeVisible();
  //   await expect(
  //     page.getByRole("button", { name: "Switch between dark and light" }),
  //   ).toBeVisible();
  //   await expect(
  //     page.getByRole("button", { name: "Search (Control+k)" }),
  //   ).toBeVisible();
  // });

  test("Проверка названия элементов навигации хедера", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "Playwright logo Playwright" }),
    ).toContainText("Playwright");
    await expect(page.getByRole("link", { name: "Docs" })).toContainText(
      "Docs",
    );
    await expect(
      page.getByRole("link", { name: "MCP", exact: true }),
    ).toContainText("MCP");
    await expect(
      page.getByRole("link", { name: "CLI", exact: true }),
    ).toContainText("CLI");
    await expect(page.getByRole("link", { name: "API" })).toContainText("API");
    await expect(page.getByRole("button", { name: "Node.js" })).toContainText(
      "Node.js",
    );
  });

  test("Проверка атрибутов href элементов навигации хедера", async ({
    page,
  }) => {
    await expect(
      page.getByRole("link", { name: "Docs", exact: true }),
    ).toHaveAttribute("href", "/docs/intro");

    await expect(
      page.getByRole("link", { name: "MCP", exact: true }),
    ).toHaveAttribute("href", "/mcp/introduction");

    await expect(
      page.getByRole("link", { name: "Playwright logo Playwright" }),
    ).toHaveAttribute("href", "/");

    await expect(
      page.getByRole("link", { name: "CLI", exact: true }),
    ).toHaveAttribute("href", "/agent-cli/introduction");

    await expect(page.getByRole("link", { name: "API" })).toHaveAttribute(
      "href",
      "/docs/api/class-playwright",
    );

    await expect(page.getByLabel("GitHub repository")).toHaveAttribute(
      "href",
      "https://github.com/microsoft/playwright",
    );

    await expect(page.getByLabel("Discord server")).toHaveAttribute(
      "href",
      "https://aka.ms/playwright/discord",
    );
  });

  test("Проверка light мода", async ({ page }) => {
    await page
      .getByRole("button", { name: "Switch between dark and light" })
      .click();

    await expect(page.locator("html")).toHaveAttribute(
      "data-theme-choice",
      "light",
    );

    await page.getByLabel("Switch between dark and light").click();

    await expect(page.locator("html")).toHaveAttribute(
      "data-theme-choice",
      "dark",
    );

    await page.getByLabel("Switch between dark and light").click();

    await expect(page.locator("html")).toHaveAttribute(
      "data-theme-choice",
      "system",
    );
  });

  test("Проверка заголовка", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Playwright enables reliable" }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Playwright enables reliable" }),
    ).toContainText(
      "Playwright enables reliable web automation for testing, scripting, and AI agents.",
    );
  });

  test("Проверка кнопки Get started", async ({ page }) => {
    await expect
      .soft(page.getByRole("link", { name: "Get started" }))
      .toBeVisible();

    await expect
      .soft(page.getByRole("link", { name: "Get started" }))
      .toContainText("Get started");

    await expect
      .soft(page.getByRole("link", { name: "Get started" }))
      .toHaveAttribute("href", "/docs/intro");
  });
});
