var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var db = require('../models/index');
var passport = require('../auth/passport');

//Sync the database on server start
if (process.env.NODE_ENV !== 'test'){
  console.log("Database syncing...");
  db.sequelize.sync({force: false})
  .then(function(){
    console.log("Database synced!");
  })
  .catch(function(err){
    console.log("Database start error!",err);
  });
}

module.exports = function (app, express) {
  //Function for authenticating routes
  var checkUser = function(req,res,next){
      if( !req.isAuthenticated() ) {
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
  app.use(session({ store: new RedisStore({
      host: '127.0.0.1',
      port: 6379
    }),
    secret: 'keyboard cat', 
    resave: false, saveUninitialized: false,
    cookie: {httpOnly: false}
  }));
  //Initialize passport and session management

  app.use(passport.initialize());
  app.use(passport.session());

  //Handle CORS
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

  //For debugging. Log every request
  app.use(function (req, res, next) {
    console.log('==========================================');
    console.log(req.method + ': ' + req.url);
    if (req.isAuthenticated()){
      console.log("Authenticated");
      console.log("Username:",req.user.username, "Provider:", req.user.provider);
    } else {
      console.log("Unauthenticated");
    }
    console.log("Request Body:",req.body);
    next();
  });

  //Serve up static files in client folder and other middleware
  app.use(express.static(__dirname + '/../../public'));

  app.get("/", function(req, res) {
    res.sendFile(__dirname + '../../public/index.html');
  });

  // app.get('/', function (req, res) {
  //   res.render('index.html');
  // });

  //Load and setup API router
  var apiRouter = require('../routers/apiRouters/apiRouter');
  app.use('/api', checkUser, apiRouter);

  //Load and setup authentication router
  var authRouter = require('../routers/authRouters/authRouter');
  app.use('/auth', authRouter);

  var dataRouter = require('../routers/dataRouters/dataRouter');
  app.use('/data', dataRouter);
};
