const { pathsToModuleNameMapper } = require('ts-jest');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    "src"
  ],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.spec.json'
    }
  },
  testMatch: [
    "**/*.spec.ts"
  ],
  moduleNameMapper: pathsToModuleNameMapper({
    "@/*": [ "./src/*" ]
  }, {
    prefix: '<rootDir>/'
  }),
  setupFiles: [
    "<rootDir>/src/polyfills.ts"
  ],
};
