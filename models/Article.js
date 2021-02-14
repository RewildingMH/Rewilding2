const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: String,
  author: [{ name: String, profilePicture: String }],
  descripcion: String,
  visits: Number,
  picture: String,
  articleCategory:{type:String, enum:["Respect for animals", "Biodiversity", "DANGER OF EXTINCTION"]},
},
  { timestamps: true }
)

const Article = mongoose.model('article', articleSchema)

module.exports = Article