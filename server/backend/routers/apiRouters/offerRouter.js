var router = require('express').Router();
var db = require('../../models/index.js');

router.route('/')
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

router.route('/:offerId')
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
  
module.exports = router;