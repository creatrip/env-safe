module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: { project: 'tsconfig.json', sourceType: 'module' },
  plugins: ['@typescript-eslint/eslint-plugin', 'unused-imports'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  root: true,
  env: { node: true, jest: true },
  rules: {
    '@typescript-eslint/typedef': [
      'error',
      {
        arrowParameter: true,
        memberVariableDeclaration: true,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: true,
      },
    ],
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-inferrable-types': 'off',
    'unused-imports/no-unused-imports-ts': 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: { '@typescript-eslint/explicit-function-return-type': ['warn'] },
    },
  ],
};
