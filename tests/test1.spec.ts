import { test, expect } from "@playwright/test";

// Настройка УП
test("test", async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto(
    "https://intkontur-keycloak.apps.dh-dev.inlinegroup.ru/realms/kntr/protocol/openid-connect/auth?client_id=test-client&redirect_uri=https%3A%2F%2Fintkontur.apps.dh-dev.inlinegroup.ru%2Fsi%2Fversions%2Fb9d7a001-3d3a-1174-be5b-796678b0dba4%2Fsettings%3FtypeOfObjectId%3Df7039401-32a8-d874-8204-587a6d46021e%26templateId%3D1dcb2194-95f9-4a17-8eda-52c1f2bcf76d%26yearId%3Db9d7a001-3d3a-1174-bf7c-44406d05b368%26year%3D2026%26selectedName%3D%25D0%2594%25D0%25BE%25D0%25B6%25D0%25B8%25D0%25BC%25D0%25BD%25D0%25B0%25D1%258F%2B%25D0%25BD%25D0%25B0%25D1%2581%25D0%25BE%25D1%2581%25D0%25BD%25D0%25B0%25D1%258F%2B%25D1%2581%25D1%2582%25D0%25B0%25D0%25BD%25D1%2586%25D0%25B8%25D1%258F%2B%2528%25D0%2594%25D0%259D%25D0%25A1%2529&state=b1116a3c-7249-441a-a67e-bae8930aeb23&response_mode=fragment&response_type=code&scope=openid&nonce=c99c2f90-044f-4d6e-ad6f-5e970e0dcb80&code_challenge=pj5QxBC1l-tBBPWHPRy_Zh8UYj4Sb1Kh4tNLOls9kaU&code_challenge_method=S256",
  );
  await expect(page.locator("div").nth(4)).toBeVisible();
  await page.getByRole("textbox", { name: "Username or email" }).click();
  await page.getByRole("textbox", { name: "Username or email" }).fill("ivan");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("ivan");
  await page.getByRole("button", { name: "Sign In" }).click();

  // Ждем прогрузки данных
  await page
    .locator('#styles-list [class*="menu_loader"]')
    .waitFor({ state: "visible", timeout: 60000 })
    .catch(() => {});

  await expect(page.locator('#styles-list [class*="menu_loader"]')).toBeHidden({
    timeout: 60000,
  }); // Ждем до 30 секунд

  await page.waitForTimeout(2000);

  await page.getByRole("button", { name: "Раскрыть строки" }).click();

  // Проверяем, что чек бокс активирован. Если не активирован, то активируем
  if (
    !(await page
      .locator(
        "tr:nth-child(7) > td > ._table-cell__content_1f2ff_42 > .Checkbox > .Checkbox-Input",
      )
      .first()
      .isChecked())
  ) {
    await page
      .locator(
        "tr:nth-child(7) > td > ._table-cell__content_1f2ff_42 > .Checkbox > .Checkbox-Input",
      )
      .first()
      .check();
  }

  // 4. (Опционально) Проверяем, что он точно стал активным
  await expect(
    page
      .locator(
        "tr:nth-child(7) > td > ._table-cell__content_1f2ff_42 > .Checkbox > .Checkbox-Input",
      )
      .first(),
  ).toBeChecked();

  //Раскрыть выпадающий список
  await page
    .locator(
      "#custom-table > tbody > tr:nth-child(7) > td:nth-child(3) > div > div > div > div > div.Select-Control.Select-Control_hasInput > span > button.Select-IndicatorsDropdown",
    )
    .click();

  //Проверить видимость выпадающего списка
  await expect(page.locator("body > div > div > div")).toBeVisible();

  //Проверить наличие элементов в выпадающем списке
  await expect(page.locator("//div[text()='Ручной ввод']")).toBeVisible();

  await expect(page.locator("//div[text()='Процент']")).toBeVisible();

  await expect(
    page.locator("//div[text()='Ручной ввод, зависит от физ. параметра']"),
  ).toBeVisible();
});
