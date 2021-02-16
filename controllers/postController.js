const Post = require('../models/Post')
const path = require('path')

const postController = {
  addPost: async (req, res) => {
    console.log(req.body)
    console.log(req.user)
    console.log(req.files.file)

    const { text } = req.body
    const { name, profilePicture, _id } = req.user
    const file = req.files.file

    file.mv(path.join(__dirname, '../frontend/public/assets/postsPictures/' + file.name), error => {
      if (error) {
        console.log(error)
        return res.json({ response: error })
      }
    })

    const postPicturesLocation = `/assets/postsPictures/${file.name}`

    const newPost = new Post({
      username: name,
      userPic: profilePicture,
      picture: postPicturesLocation,
      userId: _id,
      text,
    })
    await newPost.save()
      .then(newPost => {
        return res.json({ success: true, response: newPost })
      })
      .catch(error => {
        return res.json({ success: false, error })
      })
  }

}

module.exports = postController