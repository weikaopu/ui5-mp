module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  globals: {
    wx: 'readonly',
    App: 'readonly',
    Page: 'readonly',
    Component: 'readonly',
    Behavior: 'readonly',
    getApp: 'readonly',
    getCurrentPages: 'readonly',
    'window': true,
    'document': true,
  },
  extends: ['eslint:recommended'],
  rules: {
    'semi': ['error', 'never'],
    'comma-dangle': ['error', 'only-multiline'],
    'no-unused-vars': 'warn',
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/semi': ['error', 'never'],
      },
    },
  ],
}
