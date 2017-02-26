module.exports = {
	entry: 'src/I18n.js',
	plugins: [
		require('rollup-plugin-buble')(),
	],
	external: [],
	targets: [
		{
			dest: 'dist/I18n.cjs.js',
			format: 'cjs',
		},
		{
			dest: 'dist/I18n.es.js',
			format: 'es',
		}
	]
};
