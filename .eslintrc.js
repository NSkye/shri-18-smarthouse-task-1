module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  'extends': [
    'standard',
    'plugin:vue/essential'
  ],
  'plugins': [
    'vue'
  ],
  'parserOptions': {
    'parser': 'babel-eslint',
    'sourceType': 'module',
    'ecmaVersion': 2018
  },
  'rules': {
    'indent': [
      'error',
      2, {
        'SwitchCase': 1
      }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'eqeqeq': [
      'off'
    ],
    'vue/no-unused-components': [
      'off'
    ]
  }
}