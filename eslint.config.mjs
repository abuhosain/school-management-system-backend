import js from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    // Lint JS, MJS, TS files
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",  // Important for .mjs files!
      },
    },
    plugins: {
      js,
    },
    ...js.configs.recommended,
  },

  // TypeScript rules
  ...tseslint.configs.recommended,

  {
    rules: {
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
    },
  },

  {
    ignores: ["node_modules/**", "dist/**"],
  },
]);
