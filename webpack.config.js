module.exports = {
	// devtool: 'cheap-module-eval-source-map',
	entry: __dirname + '/app/index.js',
	output: {
		path: __dirname + '/public',
		// publicPath: '/assets',
		filename: 'bundle.js',
		libraryTarget: 'umd'
	},
	externals: [
		{
			react: {
				commonjs: 'react',
				amd: 'react',
				root: 'React'
			}
		}
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_module/,
				loader: 'babel?cacheDirectory'
			}
		]
	}
}