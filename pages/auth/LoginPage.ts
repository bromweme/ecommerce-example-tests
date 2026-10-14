import { type Page, type Locator } from '@playwright/test';
import { LoginSection } from '../sections/LoginPage/LoginSection';
import { SignupSection } from '../sections/LoginPage/SignupSection';

export class LoginPage {
  readonly page: Page;
  readonly loginSection : LoginSection;
  readonly signupSection: SignupSection;

  readonly errorMessage: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.loginSection = new LoginSection(page);
    this.signupSection = new SignupSection(page);

    this.errorMessage = page.locator('p[style="color: red;"]');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    this.loginSection.fill(email, password);
    await this.loginSection.submit();
  }

    async register({ name, email }: { name: string; email: string }) {
    this.signupSection.fill({ name, email });
    await this.signupSection.submit();
  }
}