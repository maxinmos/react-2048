var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_module/,
        loader: 'babel',
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
