 import { test, expect } from '../../../fixtures/fixtures';
 
 test.describe('Login API', () => {

    test('POST /api/login should succeed with valid credentials', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/login`, {
        data: { email: 'demo@techmart.com', password: 'demo123' }
      });
      
      expect(response.ok()).toBeTruthy();
      
      const data = await response.json();
      expect(data.message).toBe('Login successful');
      expect(data.user.email).toBe('demo@techmart.com');
    });

    test('POST /api/login should fail with invalid credentials', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/login`, {
        data: { email: 'wrong@email.com', password: 'wrongpassword' }
      });
      
      expect(response.status()).toBe(401);
      
      const data = await response.json();
      expect(data.error).toBe('Invalid credentials');
    });

    test('POST /api/login should require email and password', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/login`, {
        data: {}
      });
      
      expect(response.status()).toBe(400);
      
      const data = await response.json();
      expect(data.error).toBe('Email and password required');
    });

    test('POST /api/register should create new user', async ({ request }) => {
      const uniqueEmail = `test${Date.now()}@example.com`;
      
      const response = await request.post(`${BASE_URL}/api/register`, {
        data: {
          name: 'Test User',
          email: uniqueEmail,
          password: 'password123'
        }
      });
      
      expect(response.status()).toBe(201);
      
      const data = await response.json();
      expect(data.message).toBe('Registration successful');
      expect(data.user.email).toBe(uniqueEmail);
    });

  });