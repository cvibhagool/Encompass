var router = require('express').Router();
var db = require('../../models/index.js');

router.route('/profile/:userId')
  // Retrieves an existing offer
  .get(function (req, res) {
    //Get profile function
    var getProfile = function(user){
      user.getOffers({include : [{model: db.Company}]}).then(function (offers) {
        user.getCompanies().then(function (companies) {
          console.log('Found offers and companies!');
          //Remove password
          user = user.toJSON();
          delete user.password;
          res.json({
            user: user,
            offers: offers,
            companies: companies
          });
        });
      });
    };
    //User gets his own profile
    if (req.params.userId === 'me'){
      //Get the user object
      var user = req.user;
      //Return the profile
      return getProfile(user);
    //Get other user's profile
    } else {
      db.User.findOne({
        where: {
          id: req.params.userId
        }
      }).then(function (user) {
        //User not found
        if(!user) {
          res.json('Requested user does not exist in the database!');
        }
        //User found
        else {
          //Return the profile
          getProfile(user);
        }
      });
    }
  });

module.exports = router;