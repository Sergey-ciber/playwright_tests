import { test, expect } from '../fixtures/mainPage';

test.describe('Performance and Accessibility Tests', () => {
  test('page loads within acceptable time', async ({ mainPage }) => {
    await test.step('Measure page load time', async () => {
      const loadTime = await mainPage.getPageLoadTime();
      expect(loadTime).toBeLessThan(5000);
    });
  });

  test('all images have alt attributes', async ({ mainPage }) => {
    await test.step('Check image alt attributes', async () => {
      const images = mainPage.page.locator('img');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        await test.step(`Check image ${i}`, async () => {
          const hasAlt = await images.nth(i).getAttribute('alt');
          expect(hasAlt !== null).toBe(true);
        });
      }
    });
  });

  test('all interactive elements have accessible labels', async ({ mainPage }) => {
    await test.step('Check buttons have aria-labels', async () => {
      const buttons = mainPage.page.locator('button');
      const count = await buttons.count();

      for (let i = 0; i < count; i++) {
        await test.step(`Check button ${i}`, async () => {
          const hasAriaLabel = (await buttons.nth(i).getAttribute('aria-label'))?.trim().length > 0;
          const hasName = (await buttons.nth(i).getAttribute('name'))?.trim().length > 0;
          const hasText = (await buttons.nth(i).textContent())?.trim().length > 0;
          expect(hasAriaLabel || hasName || hasText).toBe(true);
        });
      }
    });
  });

  test('no console errors on page load', async ({ mainPage }) => {
    await test.step('Capture console messages', async () => {
      const consoleErrors: string[] = [];
      mainPage.page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      // Give some time for any async errors to appear
      await mainPage.page.waitForTimeout(1000);

      expect(consoleErrors.length).toBe(0);
    });
  });

  test('screenshot baseline comparison', async ({ mainPage }) => {
    await test.step('Take baseline screenshot', async () => {
      await mainPage.page.screenshot({ path: 'tests/screenshots/baseline.png' });
      await expect(mainPage.page).toHaveScreenshot('baseline.png');
    });
  });
});
