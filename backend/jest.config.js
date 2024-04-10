/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  globalSetup: "<rootDir>/src/test/jest.globalSetup.ts",
  globalTeardown: "<rootDir>/src/test/jest.globalTeardown.ts",
  setupFilesAfterEnv: ["<rootDir>/src/test/jest.setup.ts"],
  testPathIgnorePatterns: ["/dist/"],
  roots: ["<rootDir>/src/"],
};
