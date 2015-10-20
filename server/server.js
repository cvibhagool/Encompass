var express = require('express');

//Creates and initializes an express application
var app = express();
var port = process.env.PORT || 3000;

//Passes app and express to middlewares
require('./config/middleware.js')(app, express);

app.get('/', function (req, res) {
	res.render('index.html');
});

//Load and setup API router
var apiRouter = require('./routers/apiRouter');
app.use('/api', apiRouter);

//Load and setup authentication router
var authRouter = require('./routers/authRouter');
app.use('/auth', authRouter);

//Passport authenticator
var authenticator = require('./authenticator');

//Initialize passport
app.use(authenticator.initialize());
app.use(authenticator.session());

app.listen(port);
console.log("Server started on port", port);

module.exports = app;
