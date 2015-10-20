module.exports = function(sequelize, DataTypes) {
  var Offer = sequelize.define('Offer', {
    position: {
      type: Sequelize.STRING
    },
    salary: {
      type: Sequelize.FLOAT
    },
    equity: {
      type: Sequelize.FLOAT
    },
    vesting_start_date : {
      type: Sequelize.DATEONLY
    },
    vesting_end_date : {
      type: Sequelize.DATEONLY
    },
    vesting_cliff_date : {
      type: Sequelize.DATEONLY
    },
    vesting_cliff_percent : {
      type: Sequelize.FLOAT
    },
    other_benefits : {
      type: Sequelize.FLOAT
    },
    last_financing_round_valuation : {
      type: Sequelize.FLOAT
    },
    estimated_exit_valuation : {
      type: Sequelize.FLOAT
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
