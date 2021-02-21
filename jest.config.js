module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '^@src(.*)$': ['<rootDir>/src$1'],
    '^@components(.*)$': ['<rootDir>/src/components/$1'],
    '^@actions(.*)$': ['<rootDir>/src/actions/$1'],
    '^@models(.*)$': ['<rootDir>/src/models/$1'],
    '^@reducers(.*)$': ['<rootDir>/src/reducers/$1'],
  },
}
