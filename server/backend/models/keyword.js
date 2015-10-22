module.exports = function(sequelize, DataTypes) {
  var Keyword = sequelize.define('Keyword', {
    name: {
      type: DataTypes.STRING
    }
  }, {  
    classMethods: {
      associate: function(models) {
        //Company N <=> M Keyword relation
        Keyword.belongsToMany(models.Company, { through: 'CompanyKeywords'});
      }
    }
  });
  
  return Keyword;
};