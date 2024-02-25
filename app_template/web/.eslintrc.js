// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
   // Remove trailing spaces
    'no-trailing-spaces': 'error',
    // Remove trailing commas
    'comma-dangle': ['error', 'never'],
    // Remove semicolons
    semi: ['error', 'never'],
    // Adjust tabs to double spaces
    'indent': ['error', 2, { 'SwitchCase': 1 }]
  }
};
