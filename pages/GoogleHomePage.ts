import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class GoogleHomePage extends BasePage {
  public CookieBtn: Locator;
  public acceptCookieBtn: Locator;
  public rejectCookieBtn: Locator;
  public searchInput: Locator; 

  constructor(page: Page) {
    super(page); 
    this.acceptCookieBtn = this.page.locator('//div[text()="Accept all"]');
    this.rejectCookieBtn = this.page.locator('//div[text()="Reject all"]');
    this.searchInput = this.page.locator('textarea[name="q"]'); 
  }
  
  async navigateToHome(): Promise<void> {
    await this.page.goto('./', { waitUntil: 'load' }); 
  }

  async submitSearch(): Promise<void> {
    await this.searchInput.press('Enter');
  }
}
