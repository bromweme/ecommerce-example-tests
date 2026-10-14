import {type Page, type Locator } from "@playwright/test";

export interface Login {
    email: string;
    password: string;
}

export class LoginSection {
    readonly form: Locator;
    readonly heading: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.form = page.locator('form').filter({ has: page.getByRole('button', { name: 'Login' }) });
        this.heading = page.getByRole('heading', { name: 'Login to your account' });
        this.emailInput = this.form.getByPlaceholder('Email Address');
        this.passwordInput = this.form.getByPlaceholder('Password');
        this.loginButton = this.form.getByRole('button', { name: 'Login' });
    }

    async fill(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }
    
    async submit() {
        await this.loginButton.click();
    }
}