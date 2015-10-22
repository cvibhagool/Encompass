var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var db = require('../models/index');
var passport = require('../auth/passport');
//Sync the database initially
db.sequelize.sync({force: false})
.then(function(){
  console.log("Database synced!");
});

module.exports = function (app, express) {
  //Function for authenticating routes
  var checkUser = function(req,res,next){
      if( !req.user ) {
        res.sendStatus(403);
      } else {
        next();
      }
  };
  //Cookie parser with same secret as session
  app.use(cookieParser('keyboard cat'));
  // Configure the app to use bodyParser()
  // This will let us get the data from post
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  //Session with same secret as cookie parser
  app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false}));
  //Initialize passport and session management

  app.use(passport.initialize());
  app.use(passport.session());

  //Handle CORS
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

  //For debugging. Log every request
  app.use(function (req, res, next) {
    console.log('==========================================');
    console.log(req.method + ': ' + req.url);
    if (req.user){
      console.log("Authenticated");
      console.log("Username:",req.user.username, "Provider:", req.user.provider);
    } else {
      console.log("Unauthenticated");
    }
    next();
  });

  //Serve up static files in client folder and other middleware
  app.use(express.static(__dirname + '/../../client/public'));

  app.get('/', function (req, res) {
    res.render('index.html');
  });

  //Load and setup API router
  var apiRouter = require('../routers/apiRouter');
  app.use('/api', apiRouter);

  //Load and setup authentication router
  var authRouter = require('../routers/authRouter');
  app.use('/auth', authRouter);

  var dataRouter = require('../routers/data/dataRouter');
  app.use('/data', dataRouter);

};