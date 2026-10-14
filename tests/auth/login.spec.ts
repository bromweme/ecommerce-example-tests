import { test, expect } from '../../fixtures/fixtures';

test.describe('Login', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('should display login form', async ({ loginPage }) => {
        await expect(loginPage.loginSection.form).toBeVisible();
        await expect(loginPage.loginSection.emailInput).toBeVisible();
        await expect(loginPage.loginSection.passwordInput).toBeVisible();
        await expect(loginPage.loginSection.loginButton).toBeVisible();
    });

    test('should show error for invalid credentials', async ({ loginPage }) => {
        // Fill in invalid credentials
        await loginPage.loginSection.emailInput.fill('wrong@email.com');
        await loginPage.loginSection.passwordInput.fill('wrongpassword');
        
        // Submit form
        await loginPage.loginSection.loginButton.click();
        
        // Verify error message
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Your email or password is incorrect!');

        await expect(loginPage.page).toHaveURL(/\/login/);
    });
    
    test('should login successfully with valid credentials', async ({ loginPage }) => {
        await loginPage.login('michael1@testorg.com', 'test123');
        
        // Verify toast message
        const logoutButton = loginPage.page.getByRole('link', { name: 'Logout' });
        const deleteAccountButton = loginPage.page.getByRole('link', { name: 'Delete Account' });
        const loggedInAsText = loginPage.page.getByText('Logged in as Test Name');
        await expect(logoutButton).toBeVisible();
        await expect(deleteAccountButton).toBeVisible(); 
        await expect(loggedInAsText).toBeVisible();
        
        
        // Verify redirect to homepage
        await loginPage.page.waitForURL('/');
    });

    test('should show validation for empty login fields', async ({ loginPage }) => {
        // Try to submit the empty form
        await loginPage.loginSection.loginButton.click();

        // Browser's built-in validation should block both fields
        const emailValid = await loginPage.loginSection.emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
        const passwordValid = await loginPage.loginSection.passwordInput.evaluate((el: HTMLInputElement) => el.checkValidity());

        expect(emailValid).toBe(false);
        expect(passwordValid).toBe(false);
        await expect(loginPage.page).toHaveURL(/\/login/);
    });
});
