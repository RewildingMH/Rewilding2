const { string } = require('joi')
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  username: { type: String},
  userPic: { type: String},
  userId: { type: String},
  picture: String,
  text: { type: String},
  likes: { type: Array, default: [] },
  comments: [{ name: String, profilePicture: String, comment: String, likes: Array, userId: String }],
}, { timestamps: true })

const Post = mongoose.model('post', postSchema)

module.exports = Post