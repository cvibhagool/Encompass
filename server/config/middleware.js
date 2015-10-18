var bodyParser = require('body-parser');
var db = require('../models/db');
module.exports = function (app, express) {
  
  //Handle CORS
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

  //Serve up static files in client folder and other middleware
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  //For debugging. Log every request
  app.use(function (req, res, next) {
    console.log('==========================================');
    console.log(req.method + ': ' + req.url);
    next();
  });

};