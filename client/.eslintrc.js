module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es6': true,
		'node': true,
	},
	'extends': [
		'eslint:recommended',
    'plugin:react/recommended'
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 2018
	},
	'parserOptions': {
		'sourceType': 'module',
	},
	'parser': 'babel-eslint',
	'plugins': [
		'react'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		]
	}
}