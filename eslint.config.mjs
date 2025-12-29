import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const react = {
  'quotes': ['warn', 'single'],
  'jsx-quotes': [2, 'prefer-double'],
  'react/jsx-indent': [2, 2],
  'react/jsx-indent-props': [2, 2],
  'indent': [2, 2, {
    SwitchCase: 1,
    ignoredNodes: [
      'JSXElement',
      'JSXElement > *',
      'JSXAttribute',
      'JSXIdentifier',
      'JSXNamespacedName',
      'JSXMemberExpression',
      'JSXSpreadAttribute',
      'JSXExpressionContainer',
      'JSXOpeningElement',
      'JSXClosingElement',
      'JSXFragment',
      'JSXOpeningFragment',
      'JSXClosingFragment',
      'JSXText',
      'JSXEmptyExpression',
      'JSXSpreadChild'
    ]
  }],
}
const typescript = {
  '@typescript-eslint/no-unused-vars': [
    1,
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
      ignoreRestSiblings: true
    }
  ],
  '@typescript-eslint/no-unsafe-function-type': 0, // 允许 unsafe 函数类型
  '@typescript-eslint/no-empty-object-type': 'off',
  '@typescript-eslint/no-use-before-define': [1], // 使用时还未定义
  '@typescript-eslint/no-explicit-any': [0], // 允许 any
  '@typescript-eslint/camelcase': [0], // 允许非驼峰 后端字段独有
  '@typescript-eslint/array-type': [1] // 允许 Array<T> 此类写法
}

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  {
    rules: {
      'max-len': [1, 120],
      'semi': [1, 'never'],
      'sort-imports': [1, {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['single', 'none', 'all', 'multiple'],
      }],
      'import/no-anonymous-default-export': 0,
      'prefer-template': 1, // 自动转化字符串拼接为 template string
      'class-methods-use-this': 0,
      'function-paren-newline': 0,
      'no-confusing-arrow': 0,
      'linebreak-style': 0,
      'no-prototype-builtins': 'off',
      'arrow-body-style': 0,
      'arrow-parens': 0,
      'object-curly-newline': 0,
      'implicit-arrow-linebreak': 0,
      'operator-linebreak': 0,
      'no-param-reassign': 2,
      'space-before-function-paren': 0,
      'object-curly-spacing': [2, 'always'],
      'space-infix-ops': 1,
      'consistent-return': 0,
      'no-console': 0,
      'comma-dangle': [2, 'only-multiline'],
      'no-unused-vars': 'off',
      'no-underscore-dangle': 0,
      'no-alert': 0,
      ...typescript,
      ...react,
      '@next/next/no-img-element': 0,
    }
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'src/generated/**',
  ]),
])

export default eslintConfig