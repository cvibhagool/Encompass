var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    provider: {
      type: DataTypes.STRING
    },
    profile_id:{
      type: DataTypes.STRING
    },
    token:{
      type: DataTypes.STRING
    },
    email:{
      type: DataTypes.STRING
    }
  }, {  
    hooks: {
    afterCreate: function (instance, options) {
      instance.hashPassword();
      }
    },
    classMethods: {
      associate: function(models) {
        //User 1 => N Offer relation
        User.hasMany(models.Offer);
        //User N <=> M Follow Company relation
        User.belongsToMany(models.Company, {through: 'UserFollows'});
      }
    },
    instanceMethods: {
      comparePassword: function(attemptedPassword, callback) {
        bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
          callback(isMatch);
        });
      },
      hashPassword: function(){
        var cipher = Promise.promisify(bcrypt.hash);
        return cipher(this.get('password'), null, null).bind(this)
          .then(function(hash) {
            if (this.get('provider') === 'local'){
              this.set('password', hash);
              console.log(hash);
              this.save();
            }
        });
      }
    }
  });
  
  return User;
};