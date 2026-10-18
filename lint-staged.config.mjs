export default {
  '*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}': ['eslint --fix --no-warn-ignored', 'prettier --write'],
  '*.{json,css,scss,md,yaml,yml}': 'prettier --write',
};
