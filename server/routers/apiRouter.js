var router = require('express').Router();
var db = require('../models/index.js');

///////////////////////////////////////////
//Routes relating to users
router.route('/user/profile/:userName')
  // Retrieves an existing offer
  .get(function (req, res) {
  	//After authentication is implemented, refactor to automatically request the profile of the logged in user
  	db.User.findOne({
  		where: {
  			username: req.params.userName
  		}
  	}).then(function (user) {
  		if(!user) {
  			res.json('Requested user does not exist in the database!');
  		}
  		else {
  			user.getOffers().then(function (offers) {
  				user.getCompanies().then(function (companies) {
  					console.log('Found offers and companies!');
            res.json({
              offers: offers,
  						companies: companies
  					});
	  			});
	  		});
  		}
	});
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
      var newOffer = db.Offer.build({
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
      });
      newOffer.setCompany(company);
      newOffer.save()
      .then(function (offer) {
        console.log('Offer has been saved to the database');
        res.json(offer);
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
  	db.User.findOne({
  		where: {
  			id: req.body.userId
  		}
  	}).then(function (user) {
  		if(!user) {
  			res.json('Cannot add company to the user\'s follow list, as user does not exist in the database!');
  		}
  		else {
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
  		}
  	});
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
