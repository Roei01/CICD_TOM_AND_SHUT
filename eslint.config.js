import globals from "globals";

export default [
  {
    ignores: ["src/public/**"], // שימוש במאפיין ignores במקום ignorePatterns
    ignores: ["src/**"], // שימוש במאפיין ignores במקום ignorePatterns
    languageOptions: { globals: globals.browser },
    rules: {
      indent: ['error', 4],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    }
  },
];
