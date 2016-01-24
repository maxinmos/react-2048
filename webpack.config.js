module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: __dirname + '/app/index.js',
	output: {
		path: __dirname + '/public',
		filename: 'bundle.js'
	},
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