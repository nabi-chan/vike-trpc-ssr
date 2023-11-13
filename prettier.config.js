/** @type {import('prettier').Config} */

export default {
  htmlWhitespaceSensitivity: 'ignore',
  printWidth: 120,
  singleQuote: true,
  quoteProps: 'consistent',

  plugins: ['prettier-plugin-packagejson'],
};
