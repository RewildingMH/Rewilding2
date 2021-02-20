const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: String,
  author: [{ name: String, profilePicture: String, idUser: String  }],
  descripcion: String,
  articleLikes:{type:[String]},
  visits: {type:Number, default:0},
  picture: String,
  articleCategory:{type:String, enum:["Respect for animals", "Biodiversity", "DANGER OF EXTINCTION", "Animals in the wild", "Ecology"]},
  comments: [{ name: String, profilePicture: String, comment: String, userId: String }],
},
  { timestamps: true }
)

const Article = mongoose.model('article', articleSchema)

module.exports = Article