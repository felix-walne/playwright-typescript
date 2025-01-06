import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class GoogleHomePage extends BasePage {
  private rejectCookieBtn: Locator;
  private searchInput: Locator; 
  private searchButton: Locator;

  constructor(page: Page) {
    super(page); 
    this.rejectCookieBtn = this.page.locator('//div[text()="Reject all"]');
    this.searchInput = this.page.locator('textarea[name="q"]'); 
    this.searchButton = this.page.locator('input[name="btnK"]');
  }
  
  async enterSearchTerm(searchTerm: string): Promise<void> {
    await this.enterText(this.searchInput, searchTerm);
  }

  async rejectCookies(): Promise<void> {
    await this.clickElement(this.rejectCookieBtn);
  }

  async navigateToHome(): Promise<void> {
    await this.page.goto('./', { waitUntil: 'load' }); 
  }

  async submitSearch(): Promise<void> {
    await this.searchInput.press('Enter');
  }
}
