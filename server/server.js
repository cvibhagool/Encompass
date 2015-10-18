var express = require('express');

//Creates and initializes an express application
var app = express();
var port = process.env.PORT || 3000;

//Passes app and express to middlewares
require('./config/middleware.js')(app, express);

app.use(express.static(__dirname + "/../client/public"));
app.get('/', function (req, res) {
	res.render('index.html');
});

app.listen(port);
console.log("Server started on port", port);
