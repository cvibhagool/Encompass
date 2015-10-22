console.log("Dropping Database, and rebuilding tables....");
var db = require('../server/models/index');
db.sequelize.sync({force: true})
.then(function(){
  console.log("Database rebuilt!");
  process.exit();
});