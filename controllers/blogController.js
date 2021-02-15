const Article = require('../models/Article')

const articleController = {
  addArticle: (req, res) => {
    console.log(req.body)
    const {  } = req.body
    const {} =req.files
    const articleSave = new Article({
    
    })
    articleSave.save()
      .then(articleSaved => {
        return res.json({ success: true, response: articleSaved })
      })
      .catch(error => {
        return res.json({ success: false, error })
      })
  },

 
}

module.exports = articleController