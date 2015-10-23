var router = require('express').Router();
var db = require('../models/index.js');
var passport = require('../auth/passport');

var callBackFunctionGenerator = function (provider) {
  return function(req, res, next) {
    passport.authenticate(provider, function(err, user) {
      if (err) { return next(err); }
      if (!user) {
        return res.status(401).send('Could not find any user with that username');
      } else {
        //Auto login user
        req.login(user, function(err){
          var userJSON = {username: user.username};
          res.json(userJSON);
        });
      }
    })(req, res, next);
  };
};

//Local signup Route
router.route('/signup')
  .post(function (req, res) {
    db.User.findOrCreate({
      where: {
        username: req.body.username,
        password: req.body.password,
        provider: 'local'
      }
    }).spread(function (user, created) {
      if (!created) {
        console.log('User already exists!');
        // Handle sending error about user not existing
      } else {
        console.log('User created');
      }
      //Auto login user
      req.login(user, function(err){
        var userJSON = {username: user.username};
        res.json(userJSON);
      });
    });
});

//Local route for deleting users
router.route('/delete')
  .delete(function (req, res) {
    console.log('Deleting user...');
    db.User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (user) {
      if (!user) {
        console.log('User does not exist; aborting delete.');
      } 
      else {
        user.comparePassword(req.body.password, function(isMatch) {
          if (!isMatch){
            console.log('Incorrect password; aborting delete.');
          }
          else {
            user.destroy().then(function() {
              res.status(204).send("User deleted");  
            });
          }
        });
      }
    });
  });

//Logout route
router.route('/logout')
  .get(function (req, res) {
    req.logout();
    res.send("Logged out", 401);
});

//Local Strategy
router.post('/local', callBackFunctionGenerator('local'));
//Facebook Strategy
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', callBackFunctionGenerator('facebook'));

module.exports = router;