//This is just a testing route for Data acceess through API
var router = require('express').Router();
var db = require('../../models/index.js');

router.route('/company')
.get(function (req, res) {
  db.Company.findAll({attributes: ['name','employees', 'employees_mom']}).then(function(companies){
    res.json(companies);
  });
});

module.exports = router;