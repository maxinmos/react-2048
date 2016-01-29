var path = require('path');
var webpack = require('webpack');

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
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify('production')
      }
    })
  ]
}
