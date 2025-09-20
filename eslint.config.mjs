import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import react from 'eslint-plugin-react';
import _import from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslint = [
  ...fixupConfigRules(
    compat.extends(
      'next/core-web-vitals',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:import/typescript',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      // 👈 OJO: ya no ponemos 'plugin:prettier/recommended' aquí
    ),
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
      import: fixupPluginRules(_import),
      prettier,
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules'],
        },
      },
    },

    rules: {
      'operator-linebreak': 'off',
      'no-underscore-dangle': 'off',
      'no-param-reassign': 'off',
      'consistent-return': 'off',
      'react/react-in-jsx-scope': 'off',
      'function-paren-newline': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
      'react/jsx-props-no-spreading': 'off',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['to', 'hrefLeft', 'hrefRight'],
          aspects: ['noHref', 'invalidHref', 'preferButton'],
        },
      ],
      'no-unused-expressions': ['error', { allowShortCircuit: true }],
      'import/no-extraneous-dependencies': 'off',
      'linebreak-style': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      'react/function-component-definition': 'off',
      'import/extensions': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'no-console': 'error',
      'prettier/prettier': 'error',
    },
  },
];

export default eslint;
