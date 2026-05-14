module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  globals: {
    showToast: 'readonly',
    showLoadingToast: 'readonly',
    showSuccessToast: 'readonly',
    showFailToast: 'readonly'
  },
  rules: {
    'vue/multi-word-component-names': 'off'
  }
}