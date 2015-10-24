var router = require('express').Router();
var db = require('../models/index.js');

///////////////////////////////////////////
//Routes relating to users
router.route('/user/profile/:userId')
  // Retrieves an existing offer
  .get(function (req, res) {
    //Get profile function
    var getProfile = function(user){
      user.getOffers().then(function (offers) {
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

// ///////////////////////////////////////////
// //Routes relating to offers
router.route('/offer')
  // Creates new offer
  .post(function (req, res) {
    db.Company.findOne({
      where: {
        name: req.body.company_name
      }
    })
    .then(function (company) {
      if (!company){
        console.log('Company does not exist!');
        return res.end();
      }
      //Build a model instance, but not save it to database yet.
      var newOffer = db.Offer.create({
        position: req.body.position,
        salary: req.body.salary,
        equity: req.body.equity,
        vesting_start_date : req.body.vesting_start_date,
        vesting_end_date : req.body.vesting_end_date,
        vesting_cliff_date : req.body.vesting_cliff_date,
        vesting_cliff_percent : req.body.vesting_cliff_percent,
        other_benefits : req.body.other_benefits,
        last_financing_round_valuation : req.body.last_financing_round_valuation,
        estimated_exit_valuation : req.body.estimated_exit_valuation
      }).then(function(newOffer){
        //Associate offer to a company
        newOffer.setCompany(company);
        //Associate offer to a logged in user
        if (req.user){
          newOffer.setUser(req.user);
        } else {
          console.log("Warning.. Offer created without a user");
        }
        console.log('Offer has been saved to the database');
        res.json(newOffer);
      });
    });
});

router.route('/offer/:offerId')
  // Retrieves an existing offer
  .get(function (req, res) {
  	db.Offer.findOne({
  		where: {
  			id: req.params.offerId
  		}
  	}).then(function (offer) {
  		if(!offer) {
  			res.json('Requested offer does not exist in the database!');
  		}
  		else {
  			res.json(offer);
  		}
  	});
  });

// ///////////////////////////////////////////
// //Routes relating to companies
router.route('/company/follow/:companyId')
  .post(function (req, res) {
    var followCompany = function(user){
      db.Company.findOne({
        where: {
          id: req.params.companyId
        }
      }).then(function (company) {
        if(!company) {
          res.json('Cannot add company to the user\'s follow list, as the company does not exist in the database!');
        }
        else {
          user.addCompany(company);
          res.json(company);
        }
      });
    };

    followCompany(user);
  });

router.route('/company/:companyId')
  // Retrieves an existing company
  .get(function (req, res) {
  	db.Company.findOne({
  		where: {
  			id: req.params.companyId
  		}
  	}).then(function (company) {
  		if(!company) {
  			res.json('Requested company does not exist in the database!');
  		}
  		else {
  			res.json(company);
  		}
  	});
});

module.exports = router;
