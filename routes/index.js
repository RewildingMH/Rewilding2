const express = require('express')
const router = express.Router()
const petitionController = require('../controllers/petitionController')

//middleware
const passport = require('passport')
require('../config/passport')

router.route('/petitions')
  .get(petitionController.getPetitions)
  .post(petitionController.addPetition)

module.exports = router

// 



