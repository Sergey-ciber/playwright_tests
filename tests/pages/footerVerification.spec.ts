import { test, expect } from '../fixtures/mainPage';
import { FooterPage } from '../models/FooterPage';

test.describe('Footer Verification Tests', () => {
  test('footer is visible', async ({ mainPage }) => {
    const footerPage = new FooterPage(mainPage.page);

    await test.step('Verify footer is visible', async () => {
      const isVisible = await footerPage.isFooterVisible();
      expect(isVisible).toBe(true);
    });
  });

  test('footer has links', async ({ mainPage }) => {
    const footerPage = new FooterPage(mainPage.page);

    await test.step('Verify footer link count', async () => {
      const linkCount = await footerPage.getFooterLinkCount();
      expect(linkCount).toBeGreaterThan(0);
    });

    await test.step('Verify footer links have valid hrefs', async () => {
      const links = await footerPage.getAllFooterLinks();
      for (const link of links) {
        await test.step(`Check link: ${link.text}`, async () => {
          expect(link.href.length).toBeGreaterThan(0);
        });
      }
    });
  });

  test('social links are present and correct', async ({ mainPage }) => {
    const footerPage = new FooterPage(mainPage.page);

    await test.step('Verify social links count', async () => {
      const socialCount = await footerPage.getSocialLinkCount();
      expect(socialCount).toBeGreaterThan(0);
    });

    await test.step('Verify GitHub link in footer', async () => {
      const githubLink = mainPage.page.getByRole('link', { name: 'GitHub repository' });
      await expect(githubLink).toBeVisible();
      await expect(githubLink).toHaveAttribute('href', 'https://github.com/microsoft/playwright');
    });

    await test.step('Verify Discord link in footer', async () => {
      const discordLink = mainPage.page.getByRole('link', { name: 'Discord server' });
      await expect(discordLink).toBeVisible();
      await expect(discordLink).toHaveAttribute('href', 'https://aka.ms/playwright/discord');
    });
  });
});
