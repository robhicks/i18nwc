const buble = require('rollup-plugin-buble');
let input = 'src/I18nwc.js';
let plugins = [
  buble()
];
let globals = [];

export default [
  {
    input,
    plugins,
    globals,
    name: 'I18nwc',
    output: {
      file: 'dist/I18nwc.iife.js',
      format: 'iife'
    }
  },
  {
    input,
    plugins,
    globals,
    output: {
      file: 'dist/I18nwc.cjs.js',
      format: 'cjs'
    }
  },
  {
    input,
    plugins,
    globals,
    output: {
      file: 'dist/I18nwc.es.js',
      format: 'es'
    }
  }
];
