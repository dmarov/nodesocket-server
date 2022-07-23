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
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  setupFiles: [ "<rootDir>/src/polyfills.ts" ],
};
