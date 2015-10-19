//Seed data
module.exports = function(){
  var db = require('../../models/index');
  var seedData = require('./seedData.json');
  //For each company data

  var cleanString = function(val){
    if (val === undefined){
      return undefined;
    }
    var newVal = val.trim();
    return newVal ? newVal : undefined;
  };

  var cleanNumber = function(val){
    var newVal = parseFloat(val.replace(',','').replace('$',''));
    return newVal ? newVal : undefined;
  };

  var cleanPercent = function(val){
    var newVal = parseFloat(val.replace('%','')/100);
    return newVal ? newVal : undefined;
  };

  var cleanDate = function(val){
    var newVal = new Date(val + "PST");
    if (isNaN(newVal.getTime())){
      return undefined;
    }
    else{
      return newVal;
    }
  };

  var cleanCompany = function(data){
    var company = {};

    company.name = cleanString(data.name);
    company.website = cleanString(data.website);
    company.growth_score = cleanNumber(data.growth_score);
    company.mindshare_score = cleanNumber(data.mindshare_score);
    company.custom_score = cleanNumber(data.custom_score);
    company.weekly_momentum = cleanNumber(data.weekly_momentum);
    company.employees = cleanNumber(data.employees);
    company.employees_mom = cleanPercent(data.employees_mom);
    company.monthly_unique = cleanNumber(data.monthly_unique);
    company.monthly_unique_mom = cleanPercent(data.monthly_unique_mom);
    company.founding_date = cleanDate(data.founding_date);
    company.stage = cleanString(data.stage);
    company.total_funding = cleanNumber(data.total_funding);
    company.last_funding_date = cleanDate(data.last_funding_date);
    company.city = cleanString(data.city);
    company.state = cleanString(data.state);
    company.country = cleanString(data.country);

    return company;
  };

  for (var r = 0; r < seedData.length; r++){
    (function(i){
      var data = seedData[i];
      var current_row = i;
      var company = cleanCompany(data);
      var industries = data.industries.split(',').map(function(x){return x.trim();}).filter(function(x){return (x !== "");});
      var investors = data.investors.split(',').map(function(x){return x.trim();}).filter(function(x){return (x !== "");});
      var keywords = data.keywords.split(',').map(function(x){return x.trim();}).filter(function(x){return (x !== "");});
      var business_models = data.business_models.split(',').map(function(x){return x.trim();}).filter(function(x){return (x !== "");});

      db.Company.findOrCreate({ where : company })
      .then(function(companies){
        var company = companies[0];
        //Create associations for industries
        for(var i = 0; i < industries.length; i++){
          var industry = {};
          industry.name = cleanString(industries[i]);
          db.Industry.findOrCreate({ where : industry })
          .then(function(industries){
            company.addIndustry(industries[0]);
          });
        }
        //Create associations for investors
        for(var j = 0; j < investors.length; j++){
          var investor = {};
          investor.name = cleanString(investors[j]);
          db.Investor.findOrCreate({ where : investor })
          .then(function(investors){
            company.addInvestor(investors[0]);
          });
        }
        //Create associations for keywords
        for(var k = 0; k < keywords.length; k++){
          var keyword = {};
          keyword.name = cleanString(keywords[k]);
          db.Keyword.findOrCreate({ where : keyword })
          .then(function(keywords){
            company.addKeyword(keywords[0]);
          });
        }
        //Create associations for keywords
        for(var l = 0; l < business_models.length; l++){
          var business_model = {};
          business_model.name = cleanString(business_models[l]);
          db.BusinessModel.findOrCreate({ where : business_model })
          .then(function(business_models){
            company.addBusinessModel(business_models[0]);
          });
        }
      });
    })(r);
    //return;
  }
};

