var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // devtool: 'source-map',
  entry: [
    './src/index',
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'app.js',
    publicPath: '/static/',
    libraryTarget: 'var'
  },
  externals: [
    {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_module/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?importLoaders=1&modules!postcss'
          )
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('style.css')
  ]
}
