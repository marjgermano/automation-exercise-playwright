import { RegisterUserData } from "../pages/registerUser";
import { faker } from "@faker-js/faker";

export const createUserData = (): RegisterUserData => ({
  title: faker.helpers.arrayElement(["Mr.", "Mrs."]),
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  city: faker.location.city(),
  zip: faker.location.zipCode(),
  phone: faker.phone.number(),
});
