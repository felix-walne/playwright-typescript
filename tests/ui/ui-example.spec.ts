// @ts-check
import { test, expect } from '@playwright/test';
import { GoogleHomePage } from '../pages/GoogleHomePage'; // Import the GoogleHomePage class

test('google search results', async ({ page }) => {
  const homePage = new GoogleHomePage(page);

  await homePage.navigateToHome(); 

  await homePage.rejectCookies();
  await homePage.enterSearchTerm('Playwright example project');
  await homePage.submitSearch();

  await homePage.assertUrlContains('Playwright+example+project');
});