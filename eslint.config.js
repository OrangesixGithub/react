import stylistic from "@stylistic/eslint-plugin";
import TSEslintParse from "@typescript-eslint/parser";
import TSEslint from "@typescript-eslint/eslint-plugin";

export default [{
    name: "eslint",
    files: [
        "**/*.js",
        "**/*.jsx",
        "**/*.ts",
        "**/*.tsx"
    ],
    ignores: [
        "public/**",
        "vendor/**",
        "node_modules/**",
        "**/*.config.js",
    ],
    languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parser: TSEslintParse,
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
            tsconfigRootDir: import.meta.dirname,
            project: ["./tsconfig.json", "./debug/tsconfig.json"]
        },
    },
    plugins: {
        stylistic,
        "@typescript-eslint": TSEslint,
    },
    rules: {
        //Typescript
        "stylistic/semi": ["error"],
        "stylistic/indent": ["error", 4],
        "stylistic/quotes": ["error", "double"],
        "stylistic/block-spacing": ["error", "always"],
        "stylistic/object-curly-spacing": ["error", "always"],
        "stylistic/no-multi-spaces": ["error", {
            ignoreEOLComments: false,
            exceptions: { JSXAttribute: true }
        }],

        //JSX
        "stylistic/jsx-max-props-per-line": ["error", { "maximum": 1 }],
        "stylistic/jsx-tag-spacing": ["error", {
            closingSlash: "never",
            afterOpening: "never",
            beforeClosing: "never",
            beforeSelfClosing: "never",
        }],
        "stylistic/jsx-closing-bracket-location": ["error", "after-props"],
        "stylistic/jsx-sort-props": ["error", {
            ignoreCase: true,
            multiline: "first",
            callbacksLast: true,
            shorthandFirst: true,
            locale: "auto",
        }],
        "stylistic/jsx-curly-brace-presence": ["error", "never"]
    },
}];
