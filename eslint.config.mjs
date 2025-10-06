import next from 'eslint-config-next';

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  next,
  {
    ignores: [
        "node_modules/**",
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
      ],
  },
  {
    rules: {
      // You can add custom rules here if needed
      // For example:
      // "@next/next/no-img-element": "off",
    }
  }
];

export default config;