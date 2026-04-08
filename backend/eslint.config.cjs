// eslint.config.cjs
const { defineConfig, globalIgnores } = require('eslint/config');
const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = defineConfig([
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
    },

    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },

  globalIgnores(['**/dist', '**/node_modules', '**/eslint.config.cjs']),
]);
