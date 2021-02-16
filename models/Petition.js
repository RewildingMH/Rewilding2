// const { string } = require('joi')
const mongoose = require('mongoose')

const petitionSchema = new mongoose.Schema({
  title: String,
  author: [{ name: String, profilePicture: String, idUser: String }],
  id: { type: mongoose.Schema.ObjectId, ref: 'user' },
  destination: String,
  desc: String,
  visits: { type: Number, default: 0 },
  votes: [{ id: String }],
  picture: String,
  signatures: { type: Array, default: [] },
  limitDate: Date,
  goal: Number,
  reasons: [{ name: String, profilePicture: String, reason: String, likes: Array, userId: String }],
  isVerified: { type: Boolean, default: true }
},
  { timestamps: true }
)

const Petition = mongoose.model('petition', petitionSchema)

module.exports = Petition