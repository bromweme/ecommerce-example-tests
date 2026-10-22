import { AuthController } from '../../../api/AuthController';
import { test, expect } from '../../../fixtures/fixtures';
 
 test.describe('verifyLogin API', () => {

    test('POST /api/verifyLogin should succeed with valid credentials', async ({ request }) => {
      const authController = new AuthController(request);
      const response = await authController.verifyLogin("michael1@testorg.com", "test123");

      expect(response.ok()).toBeTruthy();
      
      const data = await response.json();
      console.log(data);
      expect(data.message).toBe('User exists!');
    });

    test('POST /api/verifyLogin should fail with invalid credentials', async ({ request }) => {
      const authController = new AuthController(request);
      const response = await authController.verifyLogin('wrong@email.com', 'wrongpassword');
      const data = await response.json();
      console.log(data);

      expect(data.responseCode).toBe(404);
      
      expect(data.message).toBe('User not found!');
    });

    test('POST /api/verifyLogin should require email and password', async ({ request }) => {
      const authController = new AuthController(request);
      const response = await authController.verifyLogin('', '');
      
      const data = await response.json();

      expect(data.responseCode).toBe(400);
      
      expect(data.message).toBe('Bad request, email or password parameter is missing in POST request.');
    });
  });

  test.describe('createAccount API', () => {
    
    test.beforeEach(async ({ request }) => {
      
    });

    test('POST /api/createAccount should create new user', async ({ request }) => {
      const uniqueEmail = `test${test.info().testId}@testorg.com`;
      console.log(uniqueEmail);
      const authController = new AuthController(request);
      const response = await authController.createAccount(
        'Test User',
        uniqueEmail,
        'password123',
        'Mr',
          '01',
          '01',
          '1990',
          'Test',
          'User',
          'Test Company',
          '123 Test Street',
          'Suite 100',
          'USA',
          '12345',
          'CA',
          'Test City',
          '555-555-5555'
      );
      
      const data = await response.json();
      expect(data.responseCode).toBe(201);
      expect(data.message).toBe('User created!');
    });

    test.afterEach(async ({ request }) => {
      // get the email and password from the test context
      console.log(test.info().testId);
    });


  });