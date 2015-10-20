var router = require('express').Router();
var db = require('../models/db.js');
var authenticator = require('../authenticator');

//Local login route
router.route('/login')
  .post( authenticator.authenticate('local', 
    { failureRedirect: '/login' }),
    function(req,res) {
      req.session.userid = req.user.id;
      res.end();
});

//Local signup Route
router.route('/signup')
  .post(function (req, res) {
    console.log('Signing up user...');
    db.User.findOrCreate({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).spread(function (user, created) {
      if (!created) {
        console.log('User already exists!');
        // Handle sending error about user not existing
      } else {
        console.log('User created');
      }
      res.json(user);
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

router.route('/logout')
  .get(function (req, res) {
    req.logout();
    res.send("Logged out", 401);
});

module.exports = router;