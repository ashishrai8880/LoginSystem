const express = require("express");
const router = express.Router();
const User = require('../model/user') ;
const userController = require('../controller/userController')


// Storing new User to database using POST request at endpoint '/api/auth/createuser' .
router.post('/createuser',  userController.register) ;


// Login User at the endpoint '/api/auth/login' .  Required authenticationi
router.post('/login',  userController.login)






module.exports = router;