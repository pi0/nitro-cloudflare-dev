import unjs from "eslint-config-unjs";

// https://github.com/unjs/eslint-config
export default unjs({
  ignores: [
    "**/.nuxt",
    "**/.nitro",
  ],
  rules: {
    "unicorn/prefer-top-level-await": 0,
    "unicorn/no-empty-file": 0
  },
});
