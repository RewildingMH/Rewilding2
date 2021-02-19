const express = require('express')
const router = express.Router()


//Controladores
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')
const petitionController = require('../controllers/petitionController')
const blogController = require('../controllers/blogController')
const profileController = require('../controllers/profileController')
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
router.route('/article/comment')
  .post(passport.authenticate('jwt', { session: false }), blogController.commentArticle)
  .put(blogController.editComment)
router.route('/article/comment/:artId/:commentId')
  .delete(blogController.deleteComment)
router.route('/petitions/delete/:reasonId/:petId')
  .delete(passport.authenticate('jwt', { session: false }), userController.deleteReason)

router.route('/petitions/modifyReason')
  .put(passport.authenticate('jwt', { session: false }), userController.modifyReason)

router.route('/posts').post(passport.authenticate('jwt', { session: false }), postController.addPost).get(postController.getPosts).put(passport.authenticate('jwt', { session: false }), postController.modifyPost)

router.route('/petitions/visits').post(petitionController.addVisit)

router.route('/petitions/like').post(passport.authenticate('jwt', { session: false }), userController.likeReason)

router.route('/petitions/dislike/:petId/:id').delete(passport.authenticate('jwt', { session: false }), userController.dislikeReason)

router.route('/posts/comments').post(passport.authenticate('jwt', { session: false }), postController.addComment).put(passport.authenticate('jwt', { session: false }), postController.editComment)

router.route('/posts/like').post(passport.authenticate('jwt', { session: false }), postController.likePost)

router.route('/posts/dislike/:postId').delete(passport.authenticate('jwt', { session: false }), postController.dislikePost)

router.route('/posts/:postId').delete(passport.authenticate('jwt', { session: false }), postController.deletePost)

router.route('/posts/likeComments').post(passport.authenticate('jwt', { session: false }), postController.likeComment)

router.route('/posts/dislikeComments/:idComment/:postId').delete(passport.authenticate('jwt', { session: false }), postController.dislikeComment)

router.route('/posts/comments/:postId/:idComment').delete(passport.authenticate('jwt', { session: false }), postController.deleteComment)

/* Routes Profile */ 
router.route('/profile/:id').get(profileController.getUserId)

module.exports = router




