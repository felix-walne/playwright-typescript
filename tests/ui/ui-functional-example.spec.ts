// @ts-check
import { test, expect } from '@playwright/test';
import { GoogleHomePage } from '../../pages/GoogleHomePage';
import { SearchResultsPage } from '../../pages/SearchResultsPage';

test('google search results - reject cookie', async ({ page }) => {
  const homePage = new GoogleHomePage(page);
  const searchResultsPage = new SearchResultsPage(page);

  await homePage.navigateToHome(); 

  await homePage.rejectCookieBtn.click();
  await homePage.searchInput.fill('Playwright example project');
  await homePage.searchInput.press('Enter');

  await searchResultsPage.assertPageTitleEquals('Playwright example project - Google Search');

  await homePage.assertUrlContains('Playwright+example+project');
});

test('google search results - accept cookie', async ({ page }) => {
  const homePage = new GoogleHomePage(page);

  await homePage.navigateToHome(); 

  await homePage.acceptCookieBtn.click();
  await homePage.searchInput.fill('Playwright example project');
  await homePage.searchInput.press('Enter');

  var hasCookie = await homePage.cookieWithDomainFound('google.com');
  expect(hasCookie).toBe(true);

  await homePage.assertUrlContains('Playwright+example+project');
});