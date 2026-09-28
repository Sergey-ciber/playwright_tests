import { expect, test } from "@playwright/test";

test("Проверка отображения элементов навигации хедера", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect(
    page.getByRole("link", { name: "Playwright logo Playwright" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Docs" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "MCP", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "CLI", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "API" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Node.js" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "GitHub repository" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Discord server" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Switch between dark and light" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Search (Control+k)" }),
  ).toBeVisible();
});

test("Проверка названия элементов навигации хедера", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect(
    page.getByRole("link", { name: "Playwright logo Playwright" }),
  ).toContainText("Playwright");
  await expect(page.getByRole("link", { name: "Docs" })).toContainText("Docs");
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

test("Проверка атрибутов href элементов навигации хедера", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  // await expect(page.getByRole("link", { name: "Docs" })).toHaveAttribute();
  await expect(
    page.getByRole("link", { name: "MCP", exact: true }),
  ).toHaveAttribute("MCP");
  await expect(
    page.getByRole("link", { name: "Playwright logo Playwright" }),
  ).toHaveAttribute("Playwright");
  await expect(
    page.getByRole("link", { name: "CLI", exact: true }),
  ).toHaveAttribute("CLI");
  await expect(page.getByRole("link", { name: "API" })).toHaveAttribute("API");
  await expect(page.getByRole("button", { name: "Node.js" })).toHaveAttribute(
    "Node.js",
  );
  await expect(
    page.getByRole("link", { name: "GitHub repository" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Discord server" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Switch between dark and light" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Search (Control+k)" }),
  ).toBeVisible();
});
