var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack/development');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function () {
	console.log('server started');
});
