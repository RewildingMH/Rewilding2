// const { string } = require('joi')
const mongoose = require('mongoose')

const petitionSchema = new mongoose.Schema({
  title: String,
  author: String,
  destination: String,
  desc: String,
  visits: Number,
  picture: String,
  signatures: Number,
  date: Date,
  limitDate: Date,
  comments: [{ username: String, userPic: String, comment: String }],
})

const Petition = mongoose.model('petition', petitionSchema)

module.exports = Petition