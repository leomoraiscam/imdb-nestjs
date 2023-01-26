

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  maxWorkers: 1,
  collectCoverageFrom: ['<rootDir>/modules/**/services/*.useCase.(t|j)s', '<rootDir>/modules/**/utils/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/tests(.*)$': '<rootDir>/tests/$1',
  },
};
