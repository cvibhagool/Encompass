var fs = require("fs");
var path = require("path");
var Sequelize = require('sequelize');
var environment = process.env.NODE_ENV || 'development';
var config = require('../config/db/config.json')[environment];
var sequelize;
var seeder = require("../config/seed/seeder");

if (environment === 'production') {
  sequelize = new Sequelize(config.database);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
var db = {};

fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  }).forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    //console.log('Imported ' + model.name);
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

var resetDB = true; //Set this to true to drop and recreate database
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