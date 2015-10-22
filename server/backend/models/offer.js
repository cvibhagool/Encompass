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
    vesting_start_date : {
      type: DataTypes.DATEONLY
    },
    vesting_end_date : {
      type: DataTypes.DATEONLY
    },
    vesting_cliff_date : {
      type: DataTypes.DATEONLY
    },
    vesting_cliff_percent : {
      type: DataTypes.FLOAT
    },
    other_benefits : {
      type: DataTypes.FLOAT
    },
    last_financing_round_valuation : {
      type: DataTypes.FLOAT
    },
    estimated_exit_valuation : {
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
