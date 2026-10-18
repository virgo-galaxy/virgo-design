import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**'],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
    },

    rules: {
      'no-undef': 'off',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^node:'],
            ['^@?\\w'],
            ['^'],
            ['^\\.'],
            ['^(?!\\u0000).+\\.(?:css|scss|sass|less|styl)(?:\\?.*)?$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },

  {
    files: ['apps/**/*.{ts,tsx}'],

    plugins: {
      'react-refresh': reactRefresh,
    },

    rules: {
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],
    },
  },

  {
    files: ['apps/pro/vite-react-{scss-modules,tailwind}/**/*.{ts,tsx}'],

    rules: {
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },

  {
    files: [
      'apps/website/src/components/**/*.{ts,tsx}',
      'apps/website/src/domain/**/*.{ts,tsx}',
      'apps/website/src/hooks/**/*.{ts,tsx}',
      'apps/website/src/layout/**/*.{ts,tsx}',
      'apps/website/src/lib/**/*.{ts,tsx}',
      'apps/website/src/shared/**/*.{ts,tsx}',
    ],

    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app/*', '@/features/*', '@/pages/*'],
              message:
                'Shared and infrastructure layers must not depend on app, pages, or features.',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['apps/website/src/features/**/*.{ts,tsx}'],

    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*', '@/pages/*'],
              message: 'Features must not depend on sibling features or pages.',
            },
          ],
        },
      ],
    },
  },
);
