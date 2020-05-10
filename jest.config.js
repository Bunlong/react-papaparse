module.exports = {
  roots: ['<rootDir>/test'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  setupFiles: ['<rootDir>/setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
};
