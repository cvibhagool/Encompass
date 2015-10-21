//This is just a testing route for Data acceess through API
var router = require('express').Router();
var db = require('../../models/index.js');

router.route('/company')
.get(function (req, res) {
  if (!req.query.fields){
    return res.status(404).send('Fields input empty. Try again');
  }
  db.Company.findAll({attributes: req.query.fields})
  .then(function(companies){
    res.json(companies);
  })
  .catch(function(error){
    res.status(404).send('Bad fields input. Try again!');
  });
});

module.exports = router;