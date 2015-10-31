var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var express = require('express');

import serverSideRenderer from './backend/routers/serverSideRenderer';


var app = express();
var port = process.env.PORT || 3000;

var compiler = webpack(config);

//Backend middleware
require('./backend/config/middleware.js')(app, express);
//Webpack middleware
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));


app.use(serverSideRenderer);


var server = app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});