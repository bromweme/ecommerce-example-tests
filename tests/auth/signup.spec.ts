import { test, expect } from '../../fixtures/fixtures';
import { buildUser } from '../../test-data/users';
import { faker } from '@faker-js/faker';
 
 
 test.describe('Signup', () => {
    test.beforeEach(async ({ loginPage }, testInfo) => {
        await loginPage.goto();
        const seed = Number(process.env.FAKER_SEED ?? Date.now());
        faker.seed(seed);
        testInfo.annotations.push({ type: 'faker-seed', description: String(seed) });
        
    });

    test('should display signup form', async ({ loginPage }) => {
        await expect(loginPage.signupSection.heading).toBeVisible();
        await expect(loginPage.signupSection.nameInput).toBeVisible();
        await expect(loginPage.signupSection.emailInput).toBeVisible();
        await expect(loginPage.signupSection.signupButton).toBeVisible();
    });

    test('should display error when trying to register with existing email', async ({ loginPage }) => {
        await expect(loginPage.signupSection.signupButton).toBeVisible();
        await expect(loginPage.signupSection.signupButton).toBeEnabled();
        await loginPage.signupSection.fill({ name: "Test Name", email: "test@example.com" });
        await loginPage.signupSection.submit();
        console.log(await loginPage.errorMessage.textContent());
        expect(await loginPage.errorMessage.textContent()).toBe('Email Address already exist!');

    });

    test('should show validation for empty signup fields', async ({ loginPage }) => {
        // Try to submit the empty form
        await loginPage.signupSection.signupButton.click();

        // Browser's built-in validation should block both fields
        const nameValid = await loginPage.signupSection.nameInput.evaluate((el: HTMLInputElement) => el.checkValidity());
        const emailValid = await loginPage.signupSection.emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());

        expect(nameValid).toBe(false);
        expect(emailValid).toBe(false);
        await expect(loginPage.page).toHaveURL(/\/login/);
    });

    test('should redirect to signup page', async ({ loginPage, signupPage }) => {
        const user = buildUser(); 
        await loginPage.register({ name: user.account.name, email: user.email });
        await loginPage.signupSection.submit();

        await expect(signupPage.page).toHaveURL(/\/signup/);
    });

    test('should input all fields on the login signup form', async ({ loginPage, signupPage }) => {
        const user = buildUser(); 
        await loginPage.register({ name: user.account.name, email: user.email });

        await expect(signupPage.accountInfoSection.nameInput).toBeVisible();
        await expect(signupPage.accountInfoSection.emailInput).toBeVisible();
        await expect(signupPage.createAccountButton).toBeVisible();
    });

    //validate radio buttons for Mr. and Mrs. titles. verify that when one is selected the other is not
    test('should select Mr title and Mrs title should not be selected', async ({ loginPage, signupPage }) => {
        const user = buildUser(); 
        await loginPage.register({ name: user.account.name, email: user.email});

        await signupPage.accountInfoSection.selectTitle('Mr');
        console.log(await signupPage.accountInfoSection.getTitle('Mr').isChecked());
        expect(await signupPage.accountInfoSection.getTitle('Mr').isChecked()).toBe(true);
        expect(await signupPage.accountInfoSection.getTitle('Mrs').isChecked()).toBe(false);
    });

    test('should select Mrs title and mr title should not be selected', async ({ loginPage, signupPage }) => {
        const user = buildUser(); 
        await loginPage.register({ name: user.account.name, email: user.email});

        await signupPage.accountInfoSection.selectTitle('Mrs');
        await expect( signupPage.accountInfoSection.getTitle('Mrs')).toBeChecked({ checked: true });
        await expect( signupPage.accountInfoSection.getTitle('Mr')).toBeChecked({ checked: false });
    });

    test('should populate all account information fields correctly', async ({ loginPage, signupPage }) => {
        const user = buildUser(); 
        const signupName = `Signup ${user.account.name}`; 
        await loginPage.register({ name: signupName, email: user.email});

        await expect(signupPage.accountInfoSection.heading).toBeVisible();

        await expect(signupPage.accountInfoSection.nameInput).toHaveValue(signupName);
        await expect(signupPage.accountInfoSection.emailInput).toHaveValue(user.email);
        await expect(signupPage.accountInfoSection.emailInput).toBeDisabled();

        // Enter Account Information
        await signupPage.fillAccount(user.account);    

        await expect(signupPage.accountInfoSection.getTitle('Mr')).toBeChecked({ checked: user.account.title === 'Mr' });
        await expect(signupPage.accountInfoSection.getTitle('Mrs')).toBeChecked({ checked: user.account.title === 'Mrs' }); 
        await expect(signupPage.accountInfoSection.nameInput).toHaveValue(user.account.name);
        expect(await signupPage.accountInfoSection.getTitle('Mr').isChecked()).toBe(user.account.title === 'Mr');
        await expect(signupPage.accountInfoSection.emailInput).toHaveValue(user.email);
        await expect(signupPage.accountInfoSection.passwordInput).toHaveValue(user.account.password);
        await expect(signupPage.accountInfoSection.dayOfBirthSelected).toHaveText(user.account.birthDate.day);
        await expect(signupPage.accountInfoSection.monthOfBirthSelected).toHaveText(user.account.birthDate.month);
        await expect(signupPage.accountInfoSection.yearOfBirthSelected).toHaveText(user.account.birthDate.year);
        
        if (user.account.newsletter) {
            await expect(signupPage.accountInfoSection.newsletterCheckbox).toBeChecked();
        } else {
            await expect(signupPage.accountInfoSection.newsletterCheckbox).not.toBeChecked();
        }
        if (user.account.optin) {
            await expect(signupPage.accountInfoSection.optinCheckbox).toBeChecked();
        } else {
            await expect(signupPage.accountInfoSection.optinCheckbox).not.toBeChecked();
        }
    }); 
    test('should populate all address information fields correctly', async ({ loginPage, signupPage }) => {
        const user = buildUser(); 
        await loginPage.register({ name: user.account.name, email: user.email});
        // Address Information
        await signupPage.fillAddress(user.address);

        await expect(signupPage.addressInfoSection.firstNameInput).toHaveValue(user.address.firstName);
        await expect(signupPage.addressInfoSection.lastNameInput).toHaveValue(user.address.lastName);
        await expect(signupPage.addressInfoSection.companyInput).toHaveValue(user.address.company);
        await expect(signupPage.addressInfoSection.addressInput).toHaveValue(user.address.address);
        await expect(signupPage.addressInfoSection.address2Input).toHaveValue(user.address.address2);
        await expect(signupPage.addressInfoSection.countryInput).toHaveValue(user.address.country);
        await expect(signupPage.addressInfoSection.stateInput).toHaveValue(user.address.state);
        await expect(signupPage.addressInfoSection.cityInput).toHaveValue(user.address.city);
        await expect(signupPage.addressInfoSection.zipcodeInput).toHaveValue(user.address.zipcode);
        await expect(signupPage.addressInfoSection.mobileNumberInput).toHaveValue(user.address.mobileNumber);
    });

    test('should successfully register account after input', async ({ loginPage, signupPage }) => {
        const user = buildUser(); 
        await loginPage.register({ name: user.account.name, email: user.email});

        await signupPage.fill(user.account, user.address);


        await signupPage.submitSignupForm();
    });
});