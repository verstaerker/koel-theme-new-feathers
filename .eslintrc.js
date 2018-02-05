// https://eslint.org/docs/user-guide/configuring

// TODO: review

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    // 'html' // eslint-plugin-html
  ],
  // Uses eslint-import-resolver-webpack
  settings: {
    'import/resolver': {
      webpack: {
        config: { // Using the webpack.config.js instead caused console noise and liniting issues
          resolve: {
            extensions: [
              '.js',
              '.vue'
            ]
          }
        }
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': [0, 'always', {
      js: 'never',
      vue: 'never'
    }],
    'vue/max-attributes-per-line': [2, {
      'singleline': 3,
      'multiline': {
        'max': 1,
        'allowFirstLine': true
      }
    }],
    'vue/name-property-casing': [2, 'kebab-case'],
    'indent': 0, // Indent is not working with html script tag. Use 'vue/script-indent' instead
    'vue/script-indent': ['error', 2, {
      'baseIndent': 1,
      'switchCase': 1
    }],
    'vue/html-self-closing': [2, {
      'html': {
        'void': 'never',
        'normal': 'never', // Don't close default elements
        'component': 'always'
      },
      'svg': 'always',
      'math': 'always'
    }]
  },
  globals: {
  }
};
