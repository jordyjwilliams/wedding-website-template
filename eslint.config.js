import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs['flat/recommended'],
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
    },
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      // Enforce same unused variable convention in Svelte files
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // WORKAROUND: Disable custom element warnings for shadcn-svelte components
    // These components use rest props with $props() which triggers false positives
    // about custom element property inference. We're not building web components.
    // https://svelte.dev/docs/svelte/compiler-warnings#custom_element_props_identifier
    // TODO: Determine if we can fix at a later date.
    files: ['src/lib/components/ui/**/*.svelte'],
    rules: {
      'svelte/valid-compile': 'off',
    },
  },
  {
    // WORKAROUND: Disable custom element warnings for our custom reusable components
    // These components follow shadcn-svelte patterns with rest props which triggers
    // false positives about custom element property inference.
    files: [
      'src/lib/components/AnimatedSection.svelte',
      'src/lib/components/AnimatedGrid.svelte',
      'src/lib/components/AnimatedIcon.svelte',
      'src/lib/components/DetailCard.svelte',
      'src/lib/components/IconCard.svelte',
      'src/lib/components/TimelineItem.svelte',
    ],
    rules: {
      'svelte/valid-compile': 'off',
    },
  },
  {
    ignores: ['build/', '.svelte-kit/', 'dist/', 'node_modules/', '.netlify/', 'todo/'],
  },
  {
    // Google Apps Script environment configuration
    files: ['google-apps-script.js'],
    languageOptions: {
      globals: {
        SpreadsheetApp: 'readonly',
        ContentService: 'readonly',
        MailApp: 'readonly',
        Logger: 'readonly',
      },
    },
    rules: {
      // Allow testScript to be defined but not called (used for manual testing in Apps Script editor)
      // TODO: Remove when tested and fixed
      'no-unused-vars': ['error', { varsIgnorePattern: '^testScript$' }],
    },
  },
];
