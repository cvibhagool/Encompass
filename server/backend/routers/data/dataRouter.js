//This is just a testing route for Data acceess through API
var router = require('express').Router();
var db = require('../../models/index.js');

//Company data API
router.route('/company')
.get(function (req, res) {
  if (!req.query.fields){
    return res.status(404).send('Fields input empty. Try again');
  }
  var includeArray = [];

  //Build query for industry
  var industryArray;
  var industry = req.query.industry;
  if (industry){
    industryArray = {model: db.Industry, attributes: ['name'], where: {}, through: {attributes: []}};
    if (industry !== 'all'){
      industryArray.where = {name: industry};
    }
    includeArray.push(industryArray);
  }

  //Build query for keyword
  var keywordArray;
  var keyword = req.query.keyword;
  if (keyword){
    keywordArray = {model: db.Keyword, attributes: ['name'], where: {}, through: {attributes: []}};
    if (keyword !== 'all'){
      keywordArray.where = {name: keyword};
    }
    includeArray.push(keywordArray);
  }

  //Build query for businessmodel
  var businessmodelArray;
  var businessmodel = req.query.businessmodel;
  if (businessmodel){
    businessmodelArray = {model: db.BusinessModel, attributes: ['name'], where: {}, through: {attributes: []}};
    if (businessmodel !== 'all'){
      businessmodelArray.where = {name: businessmodel};
    }
    includeArray.push(businessmodelArray);
  }

  //Build query for investor
  var investorArray;
  var investor = req.query.investor;
  if (investor){
    investorArray = {model: db.investor, attributes: ['name'], where: {}, through: {attributes: []}};
    if (investor !== 'all'){
      investorArray.where = {name: investor};
    }
    includeArray.push(investorArray);
  }

  db.Company.findAll({
    attributes: req.query.fields,
    include: includeArray,
  }).then(function(companies){
    res.json(companies);
  })
  .catch(function(error){
    console.log(error);
    res.status(404).send('Bad fields or other params input. Try again!');
  });
});

//Industry data API
router.route('/industry')
.get(function (req, res) {
  db.Industry.findAll({
    attributes: ['name']
  }).then(function(industries){
    res.json(industries);
  })
  .catch(function(error){
    console.log(error);
    res.status(404).send('Something went wrong on our end!');
  });
});

//Keyword data API
router.route('/keyword')
.get(function (req, res) {
  db.Keyword.findAll({
    attributes: ['name']
  }).then(function(keywords){
    res.json(keywords);
  })
  .catch(function(error){
    console.log(error);
    res.status(404).send('Something went wrong on our end!');
  });
});

//Businessmodel data API
router.route('/businessmodel')
.get(function (req, res) {
  db.BusinessModel.findAll({
    attributes: ['name']
  }).then(function(businessmodels){
    res.json(businessmodels);
  })
  .catch(function(error){
    console.log(error);
    res.status(404).send('Something went wrong on our end!');
  });
});

//Investor data API
router.route('/investor')
.get(function (req, res) {
  db.Investor.findAll({
    attributes: ['name']
  }).then(function(investors){
    res.json(investors);
  })
  .catch(function(error){
    console.log(error);
    res.status(404).send('Something went wrong on our end!');
  });
});

module.exports = router;