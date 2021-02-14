// const { string } = require('joi')
const mongoose = require('mongoose')

const petitionSchema = new mongoose.Schema({
  title: String,
  author: [{ name: String, profilePicture: String }],
  destination: String,
  desc: String,
  visits: Number,
  picture: String,
  signatures: Number,
  limitDate: Date,
  reasons: [{ name: String, profilePicture: String, reason: String }],
  isVerified: { type: Boolean, default: true }
},
  { timestamps: true }
)

const Petition = mongoose.model('petition', petitionSchema)

module.exports = Petition