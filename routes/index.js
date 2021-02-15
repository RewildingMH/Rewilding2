const express = require('express')
const router = express.Router()


//Controladores
const userController = require('../controllers/userController')
const petitionController = require('../controllers/petitionController')
const blogController = require('../controllers/blogController')
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
router.route('/user/ls')
  .post(passport.authenticate('jwt', { session: false }), userController.logFromLS)
router.route('/petitions')
  .get(petitionController.getPetitions)
  .post(passport.authenticate('jwt', { session: false }), petitionController.addPetition)

router.route('/signPetition').post(passport.authenticate('jwt', { session: false }), petitionController.signPetition)
//Blog
router.route('/blog')
  .post(passport.authenticate('jwt', { session: false }), validator.isAdmin, blogController.addArticle)

router.route('/petitions/like').post(passport.authenticate('jwt', { session: false }), userController.likeReason)
router.route('/petitions/dislike/:petId/:id').delete(passport.authenticate('jwt', { session: false }), userController.dislikeReason)

router.route('/petitions/delete/:reasonId/:petId').delete(passport.authenticate('jwt', { session: false }), userController.deleteReason)

router.route('/petitions/modifyReason').put(passport.authenticate('jwt', { session: false }), userController.modifyReason)


router.route('/petitions/visits').post(petitionController.addVisit)

  .post(passport.authenticate('jwt', { session: false }), validator.isAdmin, blogController.addArticle)
  .get(blogController.getArticles)
  .put(blogController.updateArticle)
module.exports = router




