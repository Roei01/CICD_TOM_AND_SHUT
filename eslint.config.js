import globals from "globals";

export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      indent: ['error', 4],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
    ignorePatterns: ['public/**'], // הוספת השורה הזו כדי להתעלם מתיקיית public
  },
];
