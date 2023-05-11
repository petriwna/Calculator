module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    createDefaultProgram: true,
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 12,
    ecmaFeatures: {},
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'plugin:sonarjs/recommended'],
  root: true,
  plugins: ['import', 'prettier', '@typescript-eslint'],
  globals: {
    fetch: true,
    window: true,
    document: true,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        project: 'packages/*/tsconfig.json',
      },
      node: {
        extensions: ['.web.mjs', '.web.js', '.web.ts', '.web.tsx', '.mjs', '.js', '.ts', '.tsx', '.json', '.native.js'],
      },
    },
    jest: {
      version: 'detect',
    },
    //   polyfills: ['Promise', 'fetch'],
  },
  rules: {
    // prettier
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        bracketSameLine: false,
        jsxSingleQuote: false,
        printWidth: 120,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        useTabs: false,
        endOfLine: 'lf',
      },
    ],
    // TypeScript
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',

    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // v4 changes
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    // import
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [['builtin'], ['external'], ['parent', 'internal', 'sibling', 'index', 'unknown']],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // CUSTOM
    '@typescript-eslint/ban-ts-comment': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off',
    'sonarjs/no-duplicate-string': 'off',
    'arrow-body-style': 'off',
    'consistent-return': 'off',
  },
};
