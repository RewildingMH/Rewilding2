const express= require('express')
const router= express.Router()

//Controladores
const userController = require('../controllers/userController')
//middleware
const validator = require('../controllers/validator')
const passport = require('passport')
require('../config/passport')

//Routes
//Sign Up Sign with Google Sign In 
router.route('/user/signup')
.post(validator.validNewAccount, userController.signUp)
router.route('/user/sign_google')
.post(userController.signGoogle)

router.route('/user/signin')
.post(userController.signIn)

module.exports = router

// 



