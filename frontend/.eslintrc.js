module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:@typescript-eslint/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'import/extensions': 'off',
    'import/order': ['error', { alphabetize: { order: 'asc' } }],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-sort-props': 'error',
    'react/prop-types': 'off',
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
    'sort-keys': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
  },
};
