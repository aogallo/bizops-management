import { expect, afterEach, beforeAll, afterAll } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

import { mswServer } from ".././mocks/mswServer";

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);
// establish API mocking before all tests
beforeAll(() => mswServer.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => mswServer.resetHandlers());
// clean up once the tests are done
afterAll(() => mswServer.close());
