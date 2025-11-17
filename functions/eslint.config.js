const tseslint = require('typescript-eslint');
const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const eslintConfigPrettier = require('eslint-config-prettier');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = tseslint.config(
  {
    ignores: ['build/**/*', '.eslintrc.js', 'eslint.config.js'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends('plugin:import/errors'),
  ...compat.extends('plugin:import/warnings'),
  ...compat.extends('plugin:import/typescript'),
  ...compat.extends('google'),
  {
    rules: {
      'import/no-unresolved': 'off',
      'indent': ['error', 2],
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
      'new-cap': 'off',
    },
  },
  eslintConfigPrettier,
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  }
);
