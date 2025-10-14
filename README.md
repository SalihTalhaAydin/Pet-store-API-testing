# Pet Store API Testing

A comprehensive API testing framework using Playwright, TypeScript, Zod for schema validation, and Faker for test data generation.

## Features

- ✅ **Playwright Test** - Modern API testing framework
- ✅ **TypeScript** - Type-safe test development
- ✅ **Zod** - Runtime schema validation
- ✅ **Faker** - Dynamic test data generation
- ✅ **Environment Variables** - Configuration via .env files
- ✅ **Multiple Reporters** - HTML, List, and JSON reports

## Project Structure

```
Pet-store-API-testing/
├── tests/
│   └── example.spec.ts        # API test examples
├── schemas/
│   └── example.schema.ts      # Zod validation schemas
├── .gitignore
├── .env.example               # Example environment variables
├── package.json
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json             # TypeScript configuration
└── README.md
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

3. **Install Playwright browsers (if needed):**
   ```bash
   npx playwright install
   ```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests in debug mode
npm run test:debug

# View test report
npm run test:report
```

## Test Examples

The project includes comprehensive API test examples:

- **User Schema Validation** - Validates user objects with Zod schemas
- **CRUD Operations** - Create, Read, Update, Delete pet records
- **Status Queries** - Find pets by status
- **Error Handling** - Test 404 and validation errors
- **Batch Validation** - Validate multiple records at once

## Schema Validation

Zod schemas are defined in `schemas/example.schema.ts`:

```typescript
import { UserSchema, PetSchema, ApiResponseSchema } from '../schemas/example.schema';

// Validate response
const validationResult = UserSchema.safeParse(responseData);
expect(validationResult.success).toBeTruthy();
```

## Dynamic Test Data

Faker generates realistic test data:

```typescript
import { faker } from '@faker-js/faker';

const mockUser = {
  id: faker.number.int({ min: 1, max: 1000 }),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
};
```

## Configuration

Configure the framework in `playwright.config.ts`:
- Test directory
- Reporters
- Timeouts
- Base URL
- HTTP headers

## Environment Variables

Configure in `.env` file:
- `BASE_URL` - API base URL (default: https://petstore.swagger.io/v2)
- `API_KEY` - API key if needed
- Other custom configurations

## Contributing

Feel free to contribute by:
1. Adding more test cases
2. Creating new schemas
3. Improving documentation
4. Reporting issues

## License

ISC
