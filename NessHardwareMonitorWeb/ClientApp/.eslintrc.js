const path = require("path");

const env = {
    es6: true,
    browser: true,
};

const ignorePatterns = [".eslintrc.js", "webpack.config.js"];

const plugins = ["@typescript-eslint", "import", "jsx-a11y"];

const extend = [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
];

const rules = {
    quotes: ["error", "double"],
    "no-unused-vars": 0,
    "@typescript-eslint/no-unused-vars": 2,
    "react/prop-types": 0,
    "require-jsdoc": 0,
    "react/require-default-props": 0,
    "object-curly-spacing": [2, "always"],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    indent: 0,
    "eqeqeq": "error",
};

const alias = {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".less"],
    map: [["item-issues-styles", "./Assets/Styles"]],
};

const settings = {
    react: {
        version: "latest",
    },
    "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
    }
};

module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins,
    env,
    ignorePatterns,
    extends: extend,
    rules,
    settings,
};