var passport = require('passport');
var db = require('../models/index.js');
var environment = process.env.NODE_ENV || 'development';
var config = require('./oauth-config')[environment];
var strategy = {
  local       : require('passport-local').Strategy,
  facebook    : require('passport-facebook').Strategy,
  // google      : require('passport-google-oauth').OAuth2Strategy,
  // github      : require('passport-github').Strategy,
  // vimeo       : require('passport-vimeo-oauth2').Strategy,
  // instagram   : require('passport-instagram').Strategy,
  // linkedin    : require('passport-linkedin-oauth2').Strategy,
  // foursquare  : require('passport-foursquare').Strategy,
  // reddit      : require('passport-reddit').Strategy
};

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.User.findById(id).then(function (user) {
    cb(null, user);
  });
});

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use('local', new strategy.local(
  // This is the callback function it will be passed the email and
  // password that have been submited.
  function(username, password, verified) {
    db.User.findOne({ where: { username: username }}).then(function(user) {
      if (!user) {
        verified(null, false, { message: 'Unknown user' });
      } 
      else {
        user.comparePassword(password, function(isMatch){
          if (!isMatch){
            verified(null, false, {message: 'Invalid password'});
          }
          else{
            verified(null, user, {message: 'Log in sucessful'});
          }
        });
      }
    });
  }
));

function StrategyGenerator (provider) {
  function findOrCreateUser (accessToken, refreshToken, profile, done) {
    // find the user in the database based on their [provider] id
    var user = {};
    user.profile_id = profile.id;
    user.provider = provider;
    db.User.findOrCreate({
      where: user
    }).spread(function(user,created){
      //Access Token
      user.token = accessToken;
      //Username
      if (!!profile.name && typeof profile.name === 'object') {
        profile.name = profile.name.givenName || 'John Doe';
      }
      user.username  = profile.displayName || profile.username || profile.name || profile.name.givenName || 'John Doe';
      //Email
      if (profile.emails && profile.emails[0]) {
          user.email = profile.emails[0].value; // [provider] can return multiple emails so we'll take the first    
      }
      user.save().then(function(user){
        return done(null, user);
      });
    });
  }   
  return new strategy[provider](config['' + provider], findOrCreateUser);
}

passport.use(StrategyGenerator('facebook'));

// passport.use(StrategyGenerator('google'))

// passport.use(StrategyGenerator('github'))

// passport.use(StrategyGenerator('linkedin'))

// passport.use(StrategyGenerator('reddit'))

// passport.use(StrategyGenerator('vimeo'))

// passport.use(StrategyGenerator('instagram'))

// passport.use(StrategyGenerator('foursquare'))

module.exports = passport;