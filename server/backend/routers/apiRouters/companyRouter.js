var router = require('express').Router();
var db = require('../../models/index.js');

router.route('/follow/:companyId')
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
    if (!req.user){
      res.json('Your are not logged in.');
    } else {
      followCompany(req.user);
    }
  });

router.route('/:companyId') 
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