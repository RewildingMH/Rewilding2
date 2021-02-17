const Post = require('../models/Post')
const path = require('path')

const postController = {
  addPost: async (req, res) => {
    console.log(req.body)
    console.log(req.user)
    //console.log(req.files.file)

    const { text } = req.body
    const { name, profilePicture, _id } = req.user

    if (req.files) {
      var file = req.files.file

      file.mv(path.join(__dirname, '../frontend/public/assets/postsPictures/' + file.name), error => {
        if (error) {
          console.log(error)
          return res.json({ response: error })
        }
      })

      var postPicturesLocation = `/assets/postsPictures/${file.name}`
    }



    if (req.files) {
      var newPost = new Post({
        username: name,
        userPic: profilePicture,
        picture: postPicturesLocation,
        userId: _id,
        text,
      })
    } else {
      var newPost = new Post({
        username: name,
        userPic: profilePicture,
        userId: _id,
        text
      })
    }
    await newPost.save()
      .then(newPost => {
        return res.json({ success: true, response: newPost })
      })
      .catch(error => {
        return res.json({ success: false, error })
      })
  },
  getPosts: async (req, res) => {
    try {
      const data = await Post.find()
      res.json({
        success: true,
        response: data
      })
    } catch (error) {
      res.json({
        success: false,
        response: error
      })
    }
  },
  addComment: async (req, res) => {
    try {
      const { postId, comment } = req.body
      const { name, profilePicture, _id } = req.user
      const response = await Post.findOneAndUpdate(
        { _id: postId },
        {
          $push: {
            comments: { name, profilePicture, comment, userId: _id }
          }
        },
        { new: true }
      )
      res.json({
        success: true,
        response
      })
    } catch (error) {
      res.json({
        success: false,
        error
      })


    }
  },

  likePost: async (req, res) => {
    try {
      const { postId } = req.body
      const { _id } = req.user
      const response = await Post.findOneAndUpdate(
        { _id: postId },
        {
          $addToSet: {
            likes: { _id }
          }
        },
        { new: true }
      )
      res.json({
        success: true,
        response
      })
    } catch (error) {
      res.json({
        success: false,
        error
      })


    }
  },
  dislikePost: async (req, res) => {
    try {
      const { postId } = req.params
      const response = await Post.findOneAndUpdate(
        { _id: postId },
        {
          $pull: {
            likes: { _id: req.user._id }
          }
        }, { new: true })
      res.json({
        success: true,
        response
      })


    } catch (error) {
      console.log(error)
      res.json({
        success: false,
        error
      })
    }
  }
}

module.exports = postController