var router = require('express').Router();
var db = require('../../models/index.js');

//User Router
var userRouter = require('./userRouter.js');
router.use('/user', userRouter);
//Offer Routes
var offerRouter = require('./offerRouter.js');
router.use('/offer', offerRouter);
//Company Routes
var companyRouter = require('./companyRouter.js');
router.use('/company', companyRouter);

module.exports = router;
