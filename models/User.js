const { string } = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String},
    lastName: { type: String },
    username: { type: String, unique: true },
    profilePicture: { type: String },
    password: String,
    rol: { type: String, default: "personal account" },
    googleId: { type: String, default: null }
})

const User = mongoose.model('user', userSchema)

module.exports = User