var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var express = require('express');
var fs = require('fs');

import serverSideRenderer from './backend/routers/serverSideRenderer';
var app = express();
var port = process.env.PORT || 3000;

var environment = process.env.NODE_ENV;
var route;
if (environment === 'production'){
  route = "http://encompass.space";
} else {
  route = "http://localhost:3000";
}
var fileBody = "export const serverRoute = '" + route + "';";
fs.writeFile('./frontend/constants/routeAPI.js', fileBody , function (err) {
  if (err) return console.log(err);
});

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
