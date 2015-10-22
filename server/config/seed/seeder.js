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
    if (typeof val === 'number'){
      return parseFloat(val);
    }
    if (!val){
      return undefined;
    }
    var newVal = parseFloat(val.replace(',','').replace('$',''));
    return newVal ? newVal : undefined;
  };

  var cleanPercent = function(val){
    if ((val === null) || (val === undefined) || (val === "")){
      return undefined;
    }
    var newVal = parseFloat(val.replace('%','')/100);
    if (newVal === 0){
      return newVal;
    }
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

  var cleanList = function(val){
    return val.split(',').map(function(x){return x.trim();}).filter(function(x){return (x !== "");});
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
    company.employees_month_ago = cleanNumber(data.employees_month_ago);
    company.employees_added_in_month = cleanNumber(data.employees_added_in_month);
    company.employees_mom = cleanPercent(data.employees_mom);
    company.employees_6_months_ago = cleanNumber(data.employees_6_months_ago);
    company.employees_added_in_6_months = cleanNumber(data.employees_added_in_6_months);
    company.employees_6_months_growth = cleanPercent(data.employees_6_months_growth);
    company.monthly_unique = cleanNumber(data.monthly_unique);
    company.monthly_unique_mom = cleanPercent(data.monthly_unique_mom);
    company.employees_added_since_last_funding = cleanNumber(data.employees_added_since_last_funding);
    company.new_person_months_since_last_funding = cleanNumber(data.new_person_months_since_last_funding);
    company.new_funding_employee_growth = cleanNumber(data.new_funding_employee_growth);
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

      var company = cleanCompany(data);
      var industries = cleanList(data.industries);
      var investors = cleanList(data.investors);
      var keywords = cleanList(data.keywords);
      var business_models = cleanList(data.business_models);

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

  }
};

