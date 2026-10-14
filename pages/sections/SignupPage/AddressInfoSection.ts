import {type Locator} from '@playwright/test'; 

export interface AddressInfo {
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
}

export class AddressInfoSection {
    readonly heading: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly addressInput: Locator;
    readonly address2Input: Locator;
    readonly countryInput: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;

    constructor(section: Locator) {
        this.heading = section.getByRole('heading', {name: 'Address Information'});
        this.firstNameInput = section.getByLabel('First name *', { exact: true });
        this.lastNameInput = section.getByLabel('Last name *', { exact: true });
        this.companyInput = section.getByLabel('Company', { exact: true });
        this.addressInput = section.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)');
        this.address2Input = section.getByLabel('Address 2', { exact: true });
        this.countryInput = section.getByLabel('Country *', { exact: true });
        this.stateInput = section.getByLabel('State *', { exact: true });
        this.cityInput = section.getByLabel('City *', { exact: true });
        this.zipcodeInput = section.locator('#zipcode');
        this.mobileNumberInput = section.getByLabel('Mobile Number *', { exact: true });
    }

    async fill(info: AddressInfo) {
        await this.firstNameInput.fill(info.firstName);
        await this.lastNameInput.fill(info.lastName);
        if (info.company !== undefined) await this.companyInput.fill(info.company);
        await this.addressInput.fill(info.address);
        if(info.address2 !== undefined) await this.address2Input.fill(info.address2);
        await this.countryInput.selectOption({label: info.country});
        await this.stateInput.fill(info.state);
        await this.cityInput.fill(info.city);
        await this.zipcodeInput.fill(info.zipcode);
        await this.mobileNumberInput.fill(info.mobileNumber);
    }
}