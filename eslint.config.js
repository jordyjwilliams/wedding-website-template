import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteConfig from './svelte.config.js';
import ts from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Allow unused vars/args that start with underscore
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // Disable resolve() enforcement - external links (target="_blank") should NOT use resolve()
      // Rule doesn't distinguish between internal and external navigation
      // Internal routes are handled properly in Button component with smart resolve() logic
      // https://github.com/sveltejs/eslint-plugin-svelte/issues/1353
      'svelte/no-navigation-without-resolve': [
        'error',
        {
          ignoreGoto: false,
          ignoreLinks: true,
          ignorePushState: false,
          ignoreReplaceState: false,
        },
      ],
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
        svelteConfig,
      },
    },
    rules: {
      // If needed add rules.
    },
  },
  {
    ignores: ['build/', '.svelte-kit/', 'dist/', 'node_modules/', '.netlify/', 'todo/'],
  },
  {
    // Google Apps Script environment — globals not available in standard JS/Node environments.
    files: ['gas/google-apps-script.js'],
    languageOptions: {
      globals: {
        SpreadsheetApp: 'readonly',
        ContentService: 'readonly',
        MailApp: 'readonly',
        Logger: 'readonly',
        PropertiesService: 'readonly',
      },
    },
    rules: {
      // testScript* functions are called manually from the Apps Script editor, not from code.
      'no-unused-vars': ['error', { varsIgnorePattern: '^testScript' }],
    },
  },
];
