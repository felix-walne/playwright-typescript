import { Page, Locator, expect } from '@playwright/test';

// Declare BasePage as abstract, so it cannot be instantiated directly
export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async assertUrlContains(text: string): Promise<void> {
    const currentUrl = await this.page.url();
    expect(currentUrl).toContain(text);
  }

  protected async clearText(inputField: Locator): Promise<void> {
    // Clear the text by filling the input with an empty string
    await this.enterText(inputField, '');
  }

  protected async clickElement(locator: Locator): Promise<void> {
    await locator.click();
  }

  protected async enterText(inputField: Locator, text: string): Promise<void> {
    await inputField.fill(text);
  }

  protected async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }
}
