const Article = require('../models/Article')
const path = require('path')

const articleController = {
  addArticle: async (req, res) => {
    const { title, descripcion, articleCategory } = req.body
    const { name, profilePicture, _id } = req.user
    const file = req.files.file
    const articlePictureUbicacion = `/assets/articlePics/${file.md5}.jpg`
    const articleSave = new Article({
      title,
      descripcion,
      articleCategory,
      picture: articlePictureUbicacion,
      author: {
        name,
        profilePicture,
        idUser: _id
      },
    })
<<<<<<< HEAD
    file.mv(path.join(__dirname, `../frontend/public/assets/articlePics/${file.md5}.jpg`), error => {
      if (error) {
        return res.json({ response: error })
      }
    })
    articleSave.save()
      .then(articleSaved => {
        return res.json({ success: true, response: articleSaved })
      })
      .catch(error => {
        return res.json({ success: false, error })
      })
=======
   file.mv(path.join(__dirname, `../client/build/assets/articlePics/${file.md5}.jpg`), error=>{
     if(error){
         return res.json({response:error})
     }})
   articleSave.save()
     .then(articleSaved => {
       return res.json({ success: true, response: articleSaved })
     })
     .catch(error => {
       return res.json({ success: false, error })
     })
>>>>>>> 977eea768356e719e3d354d9568be221d270ebf1
  },
  getArticles: async (req, res) => {
    try {
      const data = await Article.find()

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
  editArticle: async (req, res) => {
    const { _id, title, descripcion, articleCategory } = req.body.article
    try {
      await Article.findOneAndUpdate(
        { _id: _id },
        {
          $set: {
            'title': title,
            'descripcion': descripcion,
            'articleCategory': articleCategory,
          }
        },
        { new: true }
      )
    }

    catch (error) { res.json({ success: false, error }) }
  },
  deleteArticle: async (req, res) => {
    try {
      const { id } = req.body
      const response = await Article.findOneAndDelete(
        { _id: id }
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
  commentArticle: async (req, res) => {
    try {
      const { comment, artId } = req.body
      const { profilePicture, name } = req.user
      const userId = req.user._id

      const response = await Article.findOneAndUpdate(
        { _id: artId },
        {
          $push: {
            comments: { profilePicture, comment, name, userId }
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
  deleteComment: async (req, res) => {
    try {
      const { artId, commentId } = req.params
      const response = await Article.findOneAndUpdate(
        { _id: artId },
        {
          $pull: {
            comments: {
              _id: commentId
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
      const { commentId, artId, editComment } = req.body
      const response = await Article.findOneAndUpdate(
        { _id: artId, 'comments._id': commentId },
        {
          $set: {
            'comments.$.comment': editComment
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
  addVisit: async (req, res) => {
    try {
      const response = await Article.findOneAndUpdate(
        { _id: req.body.artId },
        {
          $inc: {
            visits: 1
          },
        },
        { new: true }
      )
      res.json({
        success: true,
        response,
      })
    } catch (error) {
      res.json({
        success: false,
        error
      })
    }
  }

}



module.exports = articleController