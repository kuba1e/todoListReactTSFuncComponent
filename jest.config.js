/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  // verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '.(css|scss)$': '<rootDir>/config/CSSStub.js'
  }
}
