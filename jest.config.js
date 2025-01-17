const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/services/*.ts'
  ],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  coverageReporters: [
    "text-summary",
    "lcov"
  ],
  setupFilesAfterEnv: ['./src/config/jest.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: [
    "**/*.spec.ts"
  ]
};
