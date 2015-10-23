console.log("Dropping Database, and rebuilding tables....");
var db = require('../backend/models/index');
db.sequelize.sync({force: true})
.then(function(){
  console.log("Database rebuilt!");
  process.exit();
});