module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define('Company', {
    name: {
      type: DataTypes.STRING
    },
    website: {
      type: DataTypes.STRING
    },
    growth_score: {
      type: DataTypes.FLOAT
    },
    mindshare_score: {
      type: DataTypes.FLOAT
    },
    custom_score: {
      type: DataTypes.FLOAT
    },
    weekly_momentum: {
      type: DataTypes.FLOAT
    },
    employees:{
      type: DataTypes.FLOAT
    },
    employees_mom:{
      type: DataTypes.FLOAT
    },
    monthly_unique:{
      type: DataTypes.FLOAT
    },
    monthly_unique_mom:{
      type: DataTypes.FLOAT
    },
    founding_date:{
      type: DataTypes.DATE
    },
    stage:{
      type: DataTypes.STRING
    },
    total_funding:{
      type: DataTypes.FLOAT
    },
    last_funding_date:{
      type: DataTypes.DATE
    },
    city:{
      type: DataTypes.STRING
    },
    state:{
      type: DataTypes.STRING
    },
    country:{
      type: DataTypes.STRING
    }
  }, {  
    classMethods: {
      associate: function(models) {
        //Company N <=> M User Company relation
        Company.belongsToMany(models.User, {through: 'UserFollows'});
        //Company N <=> M Industry relation
        Company.belongsToMany(models.Industry, { through: 'CompanyIndustries'});
        //Company N <=> M BusinessModel relation
        Company.belongsToMany(models.BusinessModel, { through: 'CompanyBusinessModels'});
        //Company N <=> M Investor relation
        Company.belongsToMany(models.Investor, { through: 'CompanyInvestors'});
        //Company N <=> M Keyword relation
        Company.belongsToMany(models.Keyword, { through: 'CompanyKeywords'});
      }
    }
  });
  
  return Company;
};