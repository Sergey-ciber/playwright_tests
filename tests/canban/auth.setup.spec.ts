import { test as setup, expect } from '@playwright/test';
import path from 'path';
import authSetupSetting from './authSetupSettings.json';
import userInfo from '../../playwright/userInfo.json';

const authFile = path.join(__dirname, authSetupSetting.authFilePath);

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://app.kanbano.ru/login');
  await expect(page.getByText('Вход', { exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: 'Email' }).fill(userInfo.userCredentials.username);
  await page.getByRole('textbox', { name: 'Пароль' }).fill(userInfo.userCredentials.password);
  await page.getByRole('button', { name: 'Войти' }).click();
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
