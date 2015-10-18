var Sequelize = require("sequelize");
var seeder = require("./seed");
var sequelize = new Sequelize("encompass", "", "", {
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false,
  });

var Company = sequelize.define('Company', {
  name: Sequelize.STRING,
  website: Sequelize.STRING,
  growth_score: Sequelize.FLOAT,
  mindshare_score: Sequelize.FLOAT,
  custom_score: Sequelize.FLOAT,
  weekly_momentum: Sequelize.FLOAT,
  employees: Sequelize.FLOAT,
  employees_mom: Sequelize.FLOAT,
  monthly_unique: Sequelize.FLOAT,
  monthly_unique_mom: Sequelize.FLOAT,
  founding_date: Sequelize.DATE,
  stage: Sequelize.STRING,
  total_funding: Sequelize.FLOAT,
  last_funding_date: Sequelize.DATE,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  country: Sequelize.STRING
});

var Industry = sequelize.define('Industry', {
  name: Sequelize.STRING
});

var BusinessModel = sequelize.define('BusinessModel', {
  name: Sequelize.STRING
});

var Investor = sequelize.define('Investor', {
  name: Sequelize.STRING
});

var Keyword = sequelize.define('Keyword', {
  name: Sequelize.STRING
});

//Company N:M Industry relation
Company.belongsToMany(Industry, { through: 'CompanyIndustries'});
Industry.belongsToMany(Company, { through: 'CompanyIndustries'});

//Company N:M BusinessModel relation
Company.belongsToMany(BusinessModel, { through: 'CompanyBusinessModels'});
BusinessModel.belongsToMany(Company, { through: 'CompanyBusinessModels'});

//Company N:M Investor relation
Company.belongsToMany(Investor, { through: 'CompanyInvestors'});
Investor.belongsToMany(Company, { through: 'CompanyInvestors'});

//Company N:M Keyword relation
Company.belongsToMany(Keyword, { through: 'CompanyKeywords'});
Keyword.belongsToMany(Company, { through: 'CompanyKeywords'});

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Company = Company;
db.BusinessModel = BusinessModel;
db.Industry = Industry;
db.Investor = Investor;
db.Keyword = Keyword;

module.exports = db;

var resetDB = false; //Set this to true to drop and recreate database
var seedDB = false; //Set this to true to seed companies data
if (resetDB){
  console.log("Resetting Database.....");
}
sequelize.sync({force: resetDB})
.then(function(){
  if (resetDB){
    console.log("Database reset finished!");
  }
  console.log("Database synced!");
  if (seedDB){
    console.log("Seeding database");
    seeder();
  }
});