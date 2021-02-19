import axios from 'axios'

const postActions = {
  // Añadir posteo
  addPost: (post, file) => {

    const {
      text, // Texto del posteo
      token
    } = post
    const form = new FormData() // Todos los datos van a estar dentro de form...
    form.append('text', text) // ...texto nuevo
    file && form.append('postPicture', file.name) // ...agrega nombre foto, si la tiene
    form.append('file', file) // ...agrega el archivo
    return async (dispatch, getState) => {
      const response = await axios.post('http://localhost:4000/api/posts', form, // Manda form en el body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token del usuario (para el Passport)
            'Content-Type': 'multipart/formdata',  // Parametro para poder enviar FormData
          },
        });
      dispatch({ //El Reducer va a evaluar
        type: 'ADD_POST', // el caso
        payload: response.data.response // y recibe la payload que obtiene luego de pegarle al endpoint
      })

    }
  },
  // Traer todos los posteos
  getPosts: () => {
    return async (dispatch, getState) => {
      const response = await axios.get('http://localhost:4000/api/posts')
      dispatch({
        type: 'GET_POSTS',
        payload: response.data.response
      })
    }
  },
  // Modificar un posteo
  submitPostModification: (newPost) => {
    const {
      postId, // ID del posteo
      editPost, // Texto modificado
      token,
      compressedFile // Foto
    } = newPost
    const form = new FormData()
    form.append('editPost', editPost)
    form.append('postId', postId)
    compressedFile && form.append('postPicture', compressedFile.result.name)
    compressedFile && form.append('file', compressedFile.result)
    return async (dispatch, getState) => {
      const response = await axios.put('http://localhost:4000/api/posts', form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/formdata',
          },
        })
      dispatch({
        type: 'UPDATE_POST',
        payload: response.data.response
      })
    }
  },
  // Enviar un nuevo comentario
  newComment: newComment => {
    const {
      postId, // ID del posteo
      comment, // Comentario
      token
    } = newComment
    return async (dispatch, getState) => {
      const response = await axios.post('http://localhost:4000/api/posts/comments', { postId, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      dispatch({
        type: 'UPDATE_POST',
        payload: response.data.response
      })
    }
  },
  // Likear un posteo
  sendLikePost: likePost => {
    const {
      postId, // ID del posteo
      token
    } = likePost
    return async (dispatch, getState) => {
      const response = await axios.post('http://localhost:4000/api/posts/like', { postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      dispatch({
        type: 'UPDATE_POST',
        payload: response.data.response
      })
    }
  },
  // Dislikear un posteo
  sendDislikePost: (dislikePost) => {
    const { postId, token } = dislikePost
    return async (dispatch, getState) => {
      const response = await axios.delete(`http://localhost:4000/api/posts/dislike/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      dispatch({
        type: 'UPDATE_POST',
        payload: response.data.response
      })
    }
  },
  // Eliminar un posteo
  removePost: remove => {
    const { postId, token } = remove
    return async (dispatch, getState) => {
      const response = await axios.delete(`http://localhost:4000/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch({ type: 'GET_POSTS', payload: response.data.response })
    }
  },
  // Likear un comentario de un posteo
  likeCommentPost: (ids) => {
    const { idComment, postId, token } = ids
    return async (dispatch, getState) => {
      const response = await axios.post('http://localhost:4000/api/posts/likeComments', { idComment, postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      dispatch({ type: 'UPDATE_POST', payload: response.data.response })
    }
  },
  // Dislikear un comentario de un posteo
  dislikeCommentPost: (ids) => {
    const { idComment, postId, token } = ids
    return async (dispatch, getState) => {
      const response = await axios.delete(`http://localhost:4000/api/posts/dislikeComments/${idComment}/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      dispatch({ type: 'UPDATE_POST', payload: response.data.response })
    }
  },
  // Eliminar un comentario
  deleteCommentPost: commentDelete => {
    const { postId, idComment, token } = commentDelete
    return async (dispatch, getState) => {
      const response = await axios.delete(`http://localhost:4000/api/posts/comments/${postId}/${idComment}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({ type: 'UPDATE_POST', payload: response.data.response })
    }
  },
  // Editar un comentario
  editCommentPost: (modifiedComment) => {
    const { idComment, postId, newCommentEdit, token } = modifiedComment
    return async (dispatch, getState) => {
      const response = await axios.put('http://localhost:4000/api/posts/comments', { idComment, postId, newCommentEdit },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      dispatch({ type: 'UPDATE_POST', payload: response.data.response })
    }
  }

}

export default postActions