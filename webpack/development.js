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
      },
      {
        test: /\.css$/,
        loader: 'style!css?importLoaders=1&modules!postcss'
      }
    ]
  },
  postcss: function () {
    return [
        require('autoprefixer'),
        require('precss'),
      ];
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
