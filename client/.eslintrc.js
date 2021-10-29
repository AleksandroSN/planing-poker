module.exports = {
  extends: [
    "react-app",
    "react-app/jest",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "@typescript-eslint", "jest"],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "prettier/prettier": "warn",
    "prettier/prettier": ["error", { singleQuote: false }],
    "no-console": "warn",
    "jsx-quotes": [1, "prefer-double"],
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "react-hooks/exhaustive-deps": "off",
    "import/prefer-default-export": "off",
  },
};
