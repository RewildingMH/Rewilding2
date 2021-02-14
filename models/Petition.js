// const { string } = require('joi')
const mongoose = require('mongoose')

const petitionSchema = new mongoose.Schema({
  title: String,
  author: [{ name: String, profilePicture: String, idUser: String }],
  id: { type: mongoose.Schema.ObjectId, ref: 'user' },
  destination: String,
  desc: String,
  visits: Number,
  votes: Array,
  picture: String,
  signatures: Number,
  limitDate: Date,
  reasons: [{ name: String, profilePicture: String, reason: String, likes: Array }],
  isVerified: { type: Boolean, default: true }
},
  { timestamps: true }
)

const Petition = mongoose.model('petition', petitionSchema)

module.exports = Petition