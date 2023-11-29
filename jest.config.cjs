/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.jest.json',
        },
    },
    setupFilesAfterEnv: ['./src/test/testSetup.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sss|styl)$': 'jest-css-modules',
    },
    // collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/lib/**'],
};
