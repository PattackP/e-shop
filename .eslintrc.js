module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'indent': 'off',
    'eol-last': 'off',
    'no-trailing-spaces': 'off',
    'no-multiple-empty-lines': 'off',
    'vue/multi-word-component-names': 'off'
  }
}