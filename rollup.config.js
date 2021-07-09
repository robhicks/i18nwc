let input = 'src/I18nwc.js';
let plugins = [];
let globals = [];

export default [
  {
    input,
    plugins,
    globals,
    output: {
      exports: "auto",
      file: 'dist/I18nwc.iife.js',
      format: 'iife',
      name: 'I18nwc'
    }
  },
  {
    input,
    plugins,
    globals,
    output: {
      exports: "auto",
      file: 'index.js',
      format: 'cjs'
    }
  },
  {
    input,
    plugins,
    globals,
    output: {
      exports: "auto",
      file: 'dist/I18nwc.es.js',
      format: 'es'
    }
  }
];
