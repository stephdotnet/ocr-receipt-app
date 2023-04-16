module.exports = {
  extends: [
    'universe',
    'universe/shared/typescript-analysis',
    // Disable formatting rules in ESLint that Prettier is going to be responsible for handling.
    'prettier',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'import/order': [0],
      },
    },
  ],
  ignorePatterns: ['**/node_modules/**'],
};
