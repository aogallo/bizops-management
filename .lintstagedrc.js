export default {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --ignore-unknown --write"],
  "*.{css,md,json}": ["prettier --write"],
};
