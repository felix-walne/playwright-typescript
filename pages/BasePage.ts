import { Page, Locator, expect, Browser, BrowserContext } from '@playwright/test';

// Declare BasePage as abstract, so it cannot be instantiated directly
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async assertPageTitleEquals(expectedText: string): Promise<void> {
    await this.page.waitForLoadState('load');
    const currentTitle: string = await this.page.title();
    expect(currentTitle).toEqual(expectedText);
  }

  async assertUrlContains(text: string): Promise<void> {
    const currentUrl: string = await this.page.url();
    expect(currentUrl).toContain(text);
  }

  async cookieWithDomainFound(domain: string): Promise<boolean> {
    const cookies = await this.page.context().cookies();
    var cookieCount = cookies.filter(cookie => cookie.domain.includes(domain)).length;
    console.debug(`Google cookie count: ${cookieCount}`);
    return cookies.some(cookie => cookie.domain.includes(domain));
  }

  protected async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }
}
