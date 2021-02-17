const express = require('express')
const router = express.Router()


//Controladores
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')
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

router.route('/signPetition')
.post(passport.authenticate('jwt', { session: false }), petitionController.signPetition)
//Blog
router.route('/blog')
.get(blogController.getArticles)
.put(blogController.editArticle)
router.route('/blog/delete')
.put(blogController.deleteArticle)
router.route('/blog/comment')
.post(blogController.commentArticle)
// router.route('blog/:id')
// .get(blogController.singleArticle)
router.route('/petitions/delete/:reasonId/:petId')
.delete(passport.authenticate('jwt', { session: false }), userController.deleteReason)

router.route('/petitions/modifyReason')
.put(passport.authenticate('jwt', { session: false }), userController.modifyReason)

router.route('/posts').post(passport.authenticate('jwt', { session: false }), postController.addPost).get(postController.getPosts)

router.route('/petitions/visits')
.post(petitionController.addVisit)

router.route('/posts/comments').post(passport.authenticate('jwt', { session: false }), postController.addComment)

router.route('/posts/like').post(passport.authenticate('jwt', { session: false }), postController.likePost)

module.exports = router




