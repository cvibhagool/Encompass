module.exports = function(sequelize, DataTypes) {
  var BusinessModel = sequelize.define('BusinessModel', {
    name: {
      type: DataTypes.STRING
    }
  }, {  
    classMethods: {
      associate: function(models) {
        //Company N <=> M BusinessModel relation
        BusinessModel.belongsToMany(models.Company, { through: 'CompanyBusinessModels'});
      }
    }
  });
  
  return BusinessModel;
};