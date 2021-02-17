const Post = require('../models/Post')
const path = require('path')

const postController = {
  addPost: async (req, res) => {
    try {
      const { text } = req.body
      const { name, profilePicture, _id } = req.user

      if (req.files) {
        var file = req.files.file

        file.mv(path.join(__dirname, '../frontend/public/assets/postsPictures/' + file.md5), error => {
          if (error) {
            console.log(error)
            return res.json({ response: error })
          }
        })
        var postPicturesLocation = `/assets/postsPictures/${file.md5}`
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

      const newPostSaved = await newPost.save()
      console.log(newPostSaved)

      res.json({ success: true, response: newPostSaved })
    } catch (error) {
      res.json({ success: false, error })
    }

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
  },
  modifyPost: async (req, res) => {
    try {
      const { editPost, postId } = req.body

      if (req.files) {
        var file = req.files.file
        file.mv(path.join(__dirname, '../frontend/public/assets/postsPictures/' + file.md5 + ".jpeg"), error => {
          if (error) {
            console.log(error)
            return res.json({ response: error })
          }
        })
        var editPostPicturesLocation = `/assets/postsPictures/${file.md5}.jpeg`
      }

      if (req.files) {
        var modifiedPost = await Post.findOneAndUpdate({ _id: postId },
          {
            $set: { text: editPost, picture: editPostPicturesLocation }
          },
          { new: true })
      } else {
        var modifiedPost = await Post.findByIdAndUpdate({ _id: postId },
          {
            $set: { text: editPost }
          },
          { new: true })
      }
      res.json({
        success: true,
        response: modifiedPost
      })
    } catch (error) {
      console.log(error)
      res.json({
        success: true,
        error
      })
    }
  },
  deletePost: async (req, res) => {
    try {
      const { postId } = req.params
      await Post.findOneAndDelete({ _id: postId })
      const response = await Post.find()
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
  },

  likeComment: async (req, res) => {
    try {
      const { idComment, postId } = req.body
      const response = await Post.findOneAndUpdate(
        { _id: postId, 'comments._id': idComment },
        {
          $addToSet: {
            'comments.$.likes': {
              id: req.user._id
            }
          }
        },
        { new: true })
      res.json({
        success: true,
        response
      })
    } catch (error) {
      res.json({
        success: true,
        error
      })
    }
  },

  dislikeComment: async (req, res) => {
    try {
      const { idComment, postId } = req.params
      const response = await Post.findOneAndUpdate(
        { _id: postId, 'comments._id': idComment },
        {
          $pull: {
            'comments.$.likes': {
              id: req.user._id
            }
          }
        },
        { new: true })

      res.json({
        success: true,
        response
      })
    } catch (error) {
      res.json({
        success: true,
        error
      })
    }
  },
  deleteComment: async (req, res) => {
    try {
      const { postId, idComment } = req.params
      const response = await Post.findOneAndUpdate(
        { _id: postId },
        {
          $pull: {
            comments: {
              _id: idComment
            }
          }
        },
        { new: true })
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
  editComment: async (req, res) => {
    try {
      const { idComment, postId, newCommentEdit } = req.body
      const response = await Post.findOneAndUpdate(
        { _id: postId, 'comments._id': idComment },
        {
          $set: {
            'comments.$.comment': newCommentEdit
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
  }
}

module.exports = postController