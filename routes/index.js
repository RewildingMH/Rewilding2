const express = require('express')
const router = express.Router()


//Controladores
const userController = require('../controllers/userController')
const petitionController = require('../controllers/petitionController')
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
router.route('/petitions')
  .get(petitionController.getPetitions)
  .post(petitionController.addPetition)

router.route('/signPetition').post(petitionController.signPetition)

module.exports = router

// 



