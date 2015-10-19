module.exports = function(sequelize, DataTypes) {
  var Industry = sequelize.define('Industry', {
    name: {
      type: DataTypes.STRING
    }
  }, {  
    classMethods: {
      associate: function(models) {
        //Company N <=> M Industry relation
        Industry.belongsToMany(models.Company, { through: 'CompanyIndustries'});
      }
    }
  });

  return Industry;
};