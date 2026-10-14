import { type Page, type Locator } from '@playwright/test';
import { AddressInfoSection, type AddressInfo } from '../sections/SignupPage/AddressInfoSection';
import { AccountInfoSection, type AccountInfo } from '../sections/SignupPage/AccountInfoSection';

export class SignupPage {
  readonly page: Page;
  readonly form: Locator;
  readonly accountInfoSection: AccountInfoSection;
  readonly addressInfoSection: AddressInfoSection;
  readonly createAccountButton: Locator;

  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator('form').filter({ has: page.getByRole('button', { name: 'Create Account' }) });
    this.accountInfoSection = new AccountInfoSection(page, this.form);
    this.addressInfoSection = new AddressInfoSection(this.form);
    this.createAccountButton = this.form.getByRole('button', { name: 'Create Account', exact: true });
    this.errorMessage = page.locator('p[style="color: red;"]');
  }

  async fill(account: AccountInfo, address: AddressInfo) {
    await this.accountInfoSection.fill(account);
    await this.addressInfoSection.fill(address);
  }

  async fillAccount(account: AccountInfo) {
    await this.accountInfoSection.fill(account);
  }

  async fillAddress(address: AddressInfo) {
    await this.addressInfoSection.fill(address);
  }

  async submitSignupForm() {
    await this.createAccountButton.click();
  }
}