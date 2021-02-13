const { string } = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, requerid:true},
    lastName: {type: String, requerid:true},
    username: {type: String, required:true, unique:true},
    profilePicture:{type:String, required:true},
    password: String,
    rol: {type: String, requerid:true, default:"personal account"},
    country:{type:String, required:true, default:"USA"},
    googleId:{type:String, default:null}
})

const User = mongoose.model('user', userSchema)

module.exports = User