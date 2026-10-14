import {type Page, type Locator } from "@playwright/test";

export interface Signup {
    name: string;
    email: string;
}

export class SignupSection {
    readonly form: Locator;
    readonly heading: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly signupButton: Locator;

    constructor(page: Page) {
        this.heading = page.getByRole('heading', { name: 'New User Signup!' });
        this.form = page.locator('form').filter({ has: page.getByRole('button', { name: 'Signup' }) });
        this.nameInput = this.form.getByPlaceholder('Name');
        this.emailInput = this.form.getByPlaceholder('Email Address');
        this.signupButton = this.form.getByRole('button', { name: 'Signup' });
    }

    async fill({ name, email }: Signup) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
    }

    async submit() {
        await this.signupButton.click();
    }
}