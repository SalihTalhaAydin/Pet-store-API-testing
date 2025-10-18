import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { z } from "zod";
import { getAPI, postAPI, putAPI, deleteAPI } from "../utils/apiCallHelper";

test.describe("Login and Logout API Tests", () => {
  const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;

  const createUserRequestBody = {
    id: faker.number.int({ min: 1, max: 100_000 }),
    username: "TestUserName-test-automation-delete-me",
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
    userStatus: faker.number.int({ min: 0, max: 10 }),
  };

  const expectedCreateUserResponseSchema = z.object({
    code: z.literal(200),
    type: z.literal("unknown"),
    message: z.literal(createUserRequestBody.id.toString()),
  });

  const username = createUserRequestBody.username;

  const expectedDeleteUserResponseSchema = z.object({
    code: z.literal(200),
    type: z.literal("unknown"),
    message: z.literal(username),
  });

  const expectedLoginLogoutUserResponseSchema = z.object({
    code: z.literal(200),
    type: z.literal("unknown"),
    message: z.string(),
  });

  test.beforeEach(async ({ request }) => {
    console.log("Creating user before each test...");
    await postAPI(
      request,
      `${BASE_URL}/user`,
      createUserRequestBody,
      200,
      expectedCreateUserResponseSchema
    );
  });

  test.afterEach(async ({ request }) => {
    console.log("Deleting user after each test...");
    await deleteAPI(
      request,
      `${BASE_URL}/user/${username}`,
      200,
      expectedDeleteUserResponseSchema
    );
  });

  test("Logs user into system", async ({ request }) => {
    await getAPI(
      request,
      `${BASE_URL}/user/login`,
      200,
      expectedLoginLogoutUserResponseSchema,
      { username: username, password: createUserRequestBody.password }
    );
  });

  test("Logs out current logged in user", async ({ request }) => {
    await getAPI(
      request,
      `${BASE_URL}/user/logout`,
      200,
      expectedLoginLogoutUserResponseSchema
    );
  });

  test("Invalid login attempt with wrong credentials", async ({ request }) => {
    
  })
});
