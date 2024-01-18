module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "tsconfig.json",
		sourceType: "module"
	},
	plugins: [
		"@typescript-eslint",
		"jsdoc",
		"import"
	],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript"
	],
	overrides: [
		{
			files: [
				"**/*.spec.ts"
			],
			rules: {
				"max-lines": "off",
				"max-lines-per-function": "off",
				"no-unused-expressions": "off",
				"max-nested-callbacks": "off"
			}
		}
	],
	rules: {
		"@typescript-eslint/array-type": [
			"error",
			{
				default: "array-simple"
			}
		],
		"@typescript-eslint/ban-types": [
			"error",
			{
				types: {
					Object: "Avoid using the `Object` type. Did you mean `object`?",
					Function: "Avoid using the `Function` type. Prefer a specific function type, like `() => void`.",
					Boolean: "Avoid using the `Boolean` type. Did you mean `boolean`?",
					Number: "Avoid using the `Number` type. Did you mean `number`?",
					String: "Avoid using the `String` type. Did you mean `string`?",
					Symbol: "Avoid using the `Symbol` type. Did you mean `symbol`?"
				}
			}
		],
		"@typescript-eslint/explicit-member-accessibility": [
			"error",
			{
				overrides: {
					constructors: "off"
				}
			}
		],
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/consistent-type-assertions": "error",
		"@typescript-eslint/naming-convention": [
			"error",
			{
				selector: "typeLike",
				format: [
					"PascalCase"
				]
			},
			{
				selector: "variable",
				format: [
					"camelCase",
					"PascalCase",
					"UPPER_CASE"
				]
			}
		],
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/no-shadow": "error",
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/prefer-for-of": "error",
		"@typescript-eslint/prefer-function-type": "error",
		"@typescript-eslint/consistent-type-definitions": "error",
		"@typescript-eslint/object-curly-spacing": "error",
		"@typescript-eslint/triple-slash-reference": "error",
		"@typescript-eslint/type-annotation-spacing": "error",
		"@typescript-eslint/unified-signatures": "error",
		"array-bracket-spacing": "error",
		"arrow-parens": ["error", "always"],
		"brace-style": ["error", "1tbs"],
		"constructor-super": "error",
		"curly": "error",
		"eol-last": "error",
		"eqeqeq": [
			"error",
			"always",
			{
				null: "ignore"
			}
		],
		"indent": [
			"error",
			"tab",
			{
				ignoreComments: true,
				SwitchCase: 1
			}
		],
		"max-len": [
			"error",
			{
				code: 120,
				ignoreComments: true
			}
		],
		"max-lines-per-function": [
			"error",
			{
				max: 50,
				skipComments: true
			}
		],
		"max-lines": [
			"error",
			300
		],
		"new-parens": "error",
		"no-await-in-loop": "error",
		"no-bitwise": "error",
		"no-caller": "error",
		"no-cond-assign": "error",
		"no-debugger": "error",
		"no-empty": "error",
		"no-eval": "error",
		"no-fallthrough": "off",
		"no-multiple-empty-lines": "error",
		"no-new-wrappers": "error",
		"no-shadow": "off",
		"no-throw-literal": "error",
		"no-trailing-spaces": "error",
		"no-undef-init": "error",
		"no-unsafe-finally": "error",
		"no-unused-expressions": "error",
		"no-unused-vars": "off",
		"no-var": "error",
		"prefer-const": "off",
		"quote-props": [
			"error",
			"consistent-as-needed"
		],
		"quotes": [
			"error",
			"double",
			{
				avoidEscape: true
			}
		],
		"radix": "error",
		"semi": "off",
		"@typescript-eslint/semi": ["error"],
		"space-before-function-paren": [
			"error",
			{
				anonymous: "ignore",
				named: "ignore",
				asyncArrow: "always"
			}
		],
		"space-infix-ops": "error",
		"space-unary-ops": [
			"error",
			{
				words: true,
				nonwords: false
			}
		],
		"spaced-comment": "error",
		"use-isnan": "error",
		"jsdoc/check-alignment": 2,
		"jsdoc/check-indentation": 2,
		"jsdoc/require-asterisk-prefix": 2,
		"jsdoc/no-bad-blocks": 2,
		"lines-between-class-members": [
			"error",
			"always",
			{
				exceptAfterSingleLine: true
			}
		],
		"max-nested-callbacks": [
			"error",
			2
		],
		"max-statements-per-line": "error"
	},
	ignorePatterns: [
		"frontend/**/*"
	]
};
