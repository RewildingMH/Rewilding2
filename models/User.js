const { string } = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    profilePicture: { type: String, required: true },
    password: String,
    rol: { type: String, required: true, default: "personal account" },
    googleId: { type: String, default: null }
})

const User = mongoose.model('user', userSchema)

module.exports = User