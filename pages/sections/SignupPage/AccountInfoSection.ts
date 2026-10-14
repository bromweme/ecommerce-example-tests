import {type Page, type Locator } from "@playwright/test";
export type Title = 'Mr' | 'Mrs';

export interface AccountInfo {
    title?: Title;
    name: string;
    password: string;
    birthDate: {day: string, month: string, year: string};
    newsletter: boolean;
    optin: boolean;
}

export class AccountInfoSection {
    readonly heading: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly dayOfBirthSelect: Locator;
    readonly monthOfBirthSelect: Locator;
    readonly yearOfBirthSelect: Locator;
    readonly dayOfBirthSelected: Locator;
    readonly monthOfBirthSelected: Locator;
    readonly yearOfBirthSelected: Locator;
    readonly newsletterCheckbox: Locator;
    readonly optinCheckbox: Locator;

    private readonly form: Locator;

    constructor(page: Page, form: Locator) {
        this.form = form;
        this.heading = page.getByRole('heading', {name: 'Enter Account Information'});
        this.nameInput = this.form.locator('input[name="name"]');
        this.emailInput = this.form.getByLabel('email');
        this.passwordInput = this.form.getByLabel('Password *', { exact: true });

        this.dayOfBirthSelect = this.form.getByRole('combobox').filter({ has: page.getByRole('option', { name: 'Day', exact: true }) });
        this.monthOfBirthSelect = this.form.getByRole('combobox').filter({ has: page.getByRole('option', { name: 'Month', exact: true }) });
        this.yearOfBirthSelect = this.form.getByRole('combobox').filter({ has: page.getByRole('option', { name: 'Year', exact: true }) });
        this.dayOfBirthSelected = this.dayOfBirthSelect.getByRole('option', { selected: true });
        this.monthOfBirthSelected = this.monthOfBirthSelect.getByRole('option', { selected: true });
        this.yearOfBirthSelected = this.yearOfBirthSelect.getByRole('option', { selected: true });

        this.newsletterCheckbox = this.form.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
        this.optinCheckbox = this.form.getByRole('checkbox', { name: 'Receive special offers from our partners!' });
    }

    getTitle(title: Title): Locator {
        return this.form.getByLabel(`${title}.`);
    }

    selectTitle(title: Title) {
        return this.getTitle(title).check();
    }

    async fill(info: AccountInfo) {
        if (info.title) await this.getTitle(info.title).check();
        await this.nameInput.fill(info.name);
        await this.passwordInput.fill(info.password);
        await this.dayOfBirthSelect.selectOption({ label: info.birthDate.day });
        await this.monthOfBirthSelect.selectOption({ label: info.birthDate.month });
        await this.yearOfBirthSelect.selectOption({ label: info.birthDate.year });
        await this.newsletterCheckbox.setChecked(info.newsletter);
        await this.optinCheckbox.setChecked(info.optin);
    }

}