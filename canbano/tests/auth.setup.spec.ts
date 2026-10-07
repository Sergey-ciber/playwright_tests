import { test as setup, expect } from '@playwright/test';
import path from 'path';
import canbanoAuthPath from '../canbanoAuthPath.json';
import usersInfo from '../playwright/.auth/usersInfo.json';

const authFile = path.join(__dirname, canbanoAuthPath.authFilePath);
type User = {
  name: string;
  email: string;
  password: string;
};

const user: User = {
  name: usersInfo.user_1.name,
  email: usersInfo.user_1.email,
  password: usersInfo.user_1.password,
};

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://app.kanbano.ru/login');
  await page.getByRole('textbox', { name: 'Email' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Пароль' }).fill(user.password);
  await page.locator('[data-test="submit-button"]').click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://app.kanbano.ru/boards');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('button', { name: 'М', exact: true })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
