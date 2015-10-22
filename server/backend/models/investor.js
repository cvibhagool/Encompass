module.exports = function(sequelize, DataTypes) {
  var Investor = sequelize.define('Investor', {
    name: {
      type: DataTypes.STRING
    }
  }, {  
    classMethods: {
      associate: function(models) {
        //Company N <=> M Industry relation
        Investor.belongsToMany(models.Company, { through: 'CompanyInvestors'});
      }
    }
  });
  
  return Investor;
};