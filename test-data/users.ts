import { faker } from '@faker-js/faker';
import type { AccountInfo } from '../pages/sections/SignupPage/AccountInfoSection';
import type { AddressInfo } from '../pages/sections/SignupPage/AddressInfoSection';

export interface TestUser {
  email: string;
  account: AccountInfo;
  address: AddressInfo;
}

export function testRunId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// The only countries the signup form offers
const COUNTRIES = ['India', 'United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore'];

export function buildUser(runId = testRunId()): TestUser {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  // The form's year dropdown only goes from 1900 to 2021
  const birthDate = faker.date.birthdate({ mode: 'age', min: 18, max: 80 });

  const email = `${firstName}.${lastName}+${runId}@example.com`.toLowerCase();

  return {
    // Faker gives the realistic part; the run id guarantees uniqueness
    email,
    account: {
      title: faker.helpers.arrayElement(['Mr', 'Mrs'] as const),
      name: `${firstName} ${lastName}`,
      password: faker.internet.password({ length: 12 }),
      birthDate: {
        day: String(birthDate.getDate()),
        month: birthDate.toLocaleString('en-US', { month: 'long' }),
        year: String(birthDate.getFullYear()),
      },
      newsletter: faker.datatype.boolean(),
      optin: faker.datatype.boolean(),
    },
    address: {
      firstName,
      lastName,
      company: faker.company.name(),
      address: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: faker.helpers.arrayElement(COUNTRIES),
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode('#####'),
      mobileNumber: faker.string.numeric(10),
    },
  };
}