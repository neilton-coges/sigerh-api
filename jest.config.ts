/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/services/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: [
    'text-summary',
    'lcov',
  ],
  testMatch: ['**/*.spec.ts'],
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/jest.setup.ts'],
};
