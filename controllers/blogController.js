const Article = require('../models/Article')
const path= require('path')

const articleController = { 
  addArticle: async (req, res) => {
    console.log(req.body)
    const { title,descripcion, articleCategory } = req.body
    const { name, profilePicture, _id } = req.user
    const file =req.files.file
    const articlePictureUbicacion= `/assets/articlePics/${file.name}`
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
   file.mv(path.join(__dirname, '../frontend/public/assets/articlePics/'+ file.name), error=>{
     if(error){
         console.log(error)
         return res.json({response:error})
     }})
   articleSave.save()
     .then(articleSaved => {
       return res.json({ success: true, response: articleSaved })
     })
     .catch(error => {
       return res.json({ success: false, error })
     })
  },
  getArticles: async(req, res) => {
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
    const {_id, title, descripcion, articleCategory} = req.body.article
    try 
      {await  Article.findOneAndUpdate(
          {_id: _id}, 
          {$set: {
            'title': title,
            'descripcion':descripcion,
            'articleCategory':articleCategory,
        }},
          {new: true}
        )}
      
      catch(error) {res.json({success: false, error})}
    },
    deleteArticle: async(req, res) => {
      console.log(req.body)
      
      try {
          const {id} = req.body
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
    commentArticle: async(req, res) => {
      try{
      const {comment, artId} = req.body
      const {profilePicture, name} = req.user
      
     const response = await Article.findOneAndUpdate(
        {_id: artId}, 
        {
        $push:{
          comments:{ profilePicture, comment, name}
        }
      },
        {new:true}
        )
        res.json({
          success: true,
          response
        })
      }catch(error){
        res.json({
          success: false,
          error
        })
      }
  },
  deleteComment: async(req, res) =>{
    console.log(req.params)
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
        console.log(response)
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
  editComment:(req, res) => {
    console.log(req.body)
  }
} 
 


module.exports = articleController