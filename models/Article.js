const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: String,
  author: [{ name: String, profilePicture: String, idUser: String  }],
  descripcion: String,
  articleLikes:{type:[String]},
  visits: {type:Number, default:0},
  picture: String,
  articleCategory:{type:String, enum:["Respect for animals", "Biodiversity", "DANGER OF EXTINTION"]},
  comments: [{ name: String, profilePicture: String, comments: String }],
},
  { timestamps: true }
)

const Article = mongoose.model('article', articleSchema)

module.exports = Article