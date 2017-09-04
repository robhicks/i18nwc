const buble = require('rollup-plugin-buble');
let input = 'src/I18n.js';
let plugins = [
  buble()
];
let globals = [];

export default [
  {
    input,
    plugins,
    globals,
    name: 'I18n',
    output: {
      file: 'dist/I18n.iife.js',
      format: 'iife'
    }
  },
  {
    input,
    plugins,
    globals,
    output: {
      file: 'dist/I18n.cjs.js',
      format: 'cjs'
    }
  },
  {
    input,
    plugins,
    globals,
    output: {
      file: 'dist/I18n.es.js',
      format: 'es'
    }
  }
];
