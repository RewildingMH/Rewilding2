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
  updateArticle: (req, res) => {
    const articleId= req.body.idItinerary
      Itinerary.findOneAndUpdate(
        {_id: articleId}, 
        {$set: {
          'title': req.body.title,
          'descripcion':req.body.descripcion,
          'articleCategory':req.body.articleCategory,
      }},
        {new: true}
      )
      .then(data => res.json({success: true, response: data}))
      .catch(error => res.json({success: false, error}))
    },
} 
 


module.exports = articleController