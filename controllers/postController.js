const Post = require('../models/Post')
const path = require('path')

const postController = {
  //AGREGA UN NUEVO POSTEO
  addPost: async (req, res) => {
    try {
      //RECIBE DEL FRONT LOS DATOS Y LOS DESTRUCTURA
      const { text } = req.body
      const { name, profilePicture, _id } = req.user

      if (req.files) {
        var file = req.files.file
        console.log(req.files)

        file.mv(path.join(__dirname, '../frontend/public/assets/postsPictures/' + file.md5), error => {
          if (error) {
            console.log(error)
            return res.json({ response: error })
          }
        })
        var postPicturesLocation = `/assets/postsPictures/${file.md5}`
      }

      //EVALUA SI HAY FOTO EN EL POSTEO, SI NO LA HAY, GRABA EL NUEVO POST SIN LA CLAVE PICTURE
      if (req.files) {
        var newPost = new Post({
          username: name,
          userPic: profilePicture,
          picture: postPicturesLocation,
          userId: _id,
          text,
        })
      } else {
        var newPost = new Post({
          username: name,
          userPic: profilePicture,
          userId: _id,
          text
        })
      }

      const newPostSaved = await newPost.save()

      res.json({ success: true, response: newPostSaved })
    } catch (error) {
      res.json({ success: false, error })
    }

  },
  getPosts: async (req, res) => {
    try {
      const data = await Post.find()
      res.json({
        success: true,
        response: data
      })
    } catch (error) {
      res.json({
        success: false,
        response: error
      })
    }
  },
  addComment: async (req, res) => {
    try {
      const { postId, comment } = req.body
      const { name, profilePicture, _id } = req.user

      //EVALYA EL ID DEL POSTEO Y DENTRO DE ESE POST PUSHEA EL NUEVO COMENTARIO
      const response = await Post.findOneAndUpdate(
        { _id: postId },
        {
          $push: {
            comments: { name, profilePicture, comment, userId: _id }
          }
        },
        { new: true }
      )
      res.json({
        success: true,
        response
      })
    } catch (error) {
      res.json({
        success: false,
        error
      })


    }
  },

  likePost: async (req, res) => {
    try {
      const { postId } = req.body
      const { _id } = req.user
      //AGREGA EL ID DEL USUARIO QUE LIKEO EN EL POSTEO LIKEADO
      const response = await Post.findOneAndUpdate(
        { _id: postId },
        {
          $addToSet: {
            likes: { _id }
          }
        },
        { new: true }
      )
      res.json({
        success: true,
        response
      })
    } catch (error) {
      res.json({
        success: false,
        error
      })


    }
  },
  dislikePost: async (req, res) => {
    try {
      //BUSCA DELTRO DEL ARRAY DE LIKES EL ID DEL USUARIO QUE ACCIONÓ EL BOTÓN Y LO BORRA
      const { postId } = req.params
      const response = await Post.findOneAndUpdate(
        { _id: postId },
        {
          $pull: {
            likes: { _id: req.user._id }
          }
        }, { new: true })
      res.json({
        success: true,
        response
      })


    } catch (error) {
      console.log(error)
      res.json({
        success: false,
        error
      })
    }
  },
  modifyPost: async (req, res) => {
    try {
      const { editPost, postId } = req.body
      //SI EXISTE EL USUARIO ENVÍA UNA FOTO, LA GUARDA DENTRO DE LA VARIABLE "FILE" Y GUARDA LA FOTO EN LA CARPETA ASSETS
      if (req.files) {
        var file = req.files.file
        file.mv(path.join(__dirname, '../frontend/public/assets/postsPictures/' + file.md5 + ".jpeg"), error => {
          if (error) {
            return res.json({ response: error })
          }
        })
        var editPostPicturesLocation = `/assets/postsPictures/${file.md5}.jpeg`
      }
      //SI EL EDIT DEL POST ES SOLO CON TEXTO, ENTRA ACÁ
      if (editPost && !req.files) {
        var modifiedPost = await Post.findOneAndUpdate({ _id: postId },
          {
            $set: { text: editPost }
          },
          { new: true })
        //SI EL EDIT ES SOLO CON FOTOP, ENTRA ACÁ
      } else if (req.files && editPost === "undefined") {
        var modifiedPost = await Post.findOneAndUpdate({ _id: postId },
          {
            $set: { picture: editPostPicturesLocation }
          },
          { new: true })
        //SI EL EDIT TIENE FOTO Y TEXTO, ENTRA ACÁ
      } else {
        var modifiedPost = await Post.findByIdAndUpdate({ _id: postId },
          {
            $set: { text: editPost, picture: editPostPicturesLocation }
          },
          { new: true })
      }
      res.json({
        success: true,
        response: modifiedPost
      })
    } catch (error) {
      console.log(error)
      res.json({
        success: true,
        error
      })
    }
  },
  deletePost: async (req, res) => {
    //BORRA EL POSTEO QUE COINCIDA CON EL ID QUE LE LLEGA POR PARAMS
    try {
      const { postId } = req.params
      await Post.findOneAndDelete({ _id: postId })
      const response = await Post.find()
      res.json({
        success: true,
        response
      })
    } catch (error) {
      console.log(error)
      res.json({
        success: false,
        error
      })
    }
  },

  likeComment: async (req, res) => {
    try {
      //LIKEA UN COMENTARIO DENTRO DE UN POSTEO, BUSCA EL POSTEO Y LO COMPARA CON EL POSTID, DESPUÉS, DENTRO DE "COMMENTS", A "LIKES" LE AGREGA EL ID DEL USUARIO QUE ACTIVÓ EL BOTÓN
      const { idComment, postId } = req.body
      const response = await Post.findOneAndUpdate(
        { _id: postId, 'comments._id': idComment },
        {
          $addToSet: {
            'comments.$.likes': {
              id: req.user._id
            }
          }
        },
        { new: true })
      res.json({
        success: true,
        response
      })
    } catch (error) {
      res.json({
        success: true,
        error
      })
    }
  },

  dislikeComment: async (req, res) => {
    //DISLIEKA UN COMENTARIO DENTRO DEL POSTEO
    try {
      const { idComment, postId } = req.params
      const response = await Post.findOneAndUpdate(
        { _id: postId, 'comments._id': idComment },
        {
          $pull: {
            'comments.$.likes': {
              id: req.user._id
            }
          }
        },
        { new: true })

      res.json({
        success: true,
        response
      })
    } catch (error) {
      res.json({
        success: true,
        error
      })
    }
  },
  deleteComment: async (req, res) => {
    //BORRA UN COMENTARIO DE UN POSTEO
    try {
      const { postId, idComment } = req.params
      const response = await Post.findOneAndUpdate(
        { _id: postId },
        {
          $pull: {
            comments: {
              _id: idComment
            }
          }
        },
        { new: true })
      res.json({
        success: true,
        response
      })
    } catch (error) {
      res.json({
        success: false,
        error
      })
    }
  },
  editComment: async (req, res) => {
    try {
      //EDITA UN COMENTARIO DENTRO DE UN POSTEO
      const { idComment, postId, newCommentEdit } = req.body
      const response = await Post.findOneAndUpdate(
        { _id: postId, 'comments._id': idComment },
        {
          $set: {
            'comments.$.comment': newCommentEdit
          }
        },
        { new: true }
      )
      res.json({
        success: true,
        response
      })
    } catch (error) {
      res.json({
        success: false,
        error
      })
    }
  }
}

module.exports = postController