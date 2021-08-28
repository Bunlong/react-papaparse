module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    // https://github.com/facebook/create-react-app/issues/7160#issuecomment-502631002
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: ['react-hooks'],
  rules: {
    curly: 'error',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/display-name': 'warn',
    'no-console': 'error',
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        'allowDestructuring': true, // Allow `const { props, state } = this`; false by default
        'allowedNames': ['self'] // Allow `const self = this`; `[]` by default
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  overrides: [
    {
      files: ['*.spec.ts', '*.spec.tsx'],
      rules: {
        // Allow testing runtime errors to suppress TS errors
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
