const { string } = require('joi')
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userPic: { type: String, required: true },
  userId: { type: String, required: true },
  picture: String,
  text: { type: String, required: true },
  likes: { type: Array, default: [] },
  comments: [{ name: String, profilePicture: String, comment: String, likes: Array, userId: String }],
}, { timestamps: true })

const Post = mongoose.model('post', postSchema)

module.exports = Post