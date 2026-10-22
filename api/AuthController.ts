 import { test, expect } from '../fixtures/fixtures';

import { APIRequestContext } from '@playwright/test';

export class AuthController {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async verifyLogin(email: string, password: string) {
    const response = await this.request.post('/api/verifyLogin', {
      form: { email, password },
    });
    return response;
  }

  async createAccount(
    name: string,
    email: string,
    password: string,
    title: string,
    birth_date: string,
    birth_month: string,
    birth_year: string,
    firstname: string,
    lastname: string,
    company: string,
    address1: string,
    address2: string,
    country: string,
    zipcode: string,
    state: string,
    city: string,
    mobile_number: string
    ) {
    const response = await this.request.post('/api/createAccount', {
      form: {
        name,
        email,
        password,
        title,
        birth_date,
        birth_month,
        birth_year,
        firstname,
        lastname,
        company,
        address1,
        address2,
        country,
        zipcode,
        state,
        city,
        mobile_number
      }
    });
    return response;
  }
}