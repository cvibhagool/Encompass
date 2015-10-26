module.exports = function(sequelize, DataTypes) {
  var Offer = sequelize.define('Offer', {
    position: {
      type: DataTypes.STRING
    },
    salary: {
      type: DataTypes.FLOAT
    },
    equity: {
      type: DataTypes.FLOAT
    },
    total_funding: {
      type: DataTypes.FLOAT
    },
    employees: {
      type: DataTypes.FLOAT
    }
  }, {  
    classMethods: {
      associate: function(models) {
        //Offer 1 => 1 User relation
        Offer.belongsTo(models.User);
        //Offer 1 => 1 Company relation
        Offer.belongsTo(models.Company);
      }
    }
  });
  
  return Offer;
};
