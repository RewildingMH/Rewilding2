import axios from 'axios'
import { API } from '../../Components/Api'
import Swal  from 'sweetalert2';

const postActions = {
  // Añadir posteo
  addPost: (post, file) => {
    try{
      const {
        text, // Texto del posteo
        token
      } = post
      const form = new FormData() // Todos los datos van a estar dentro de form...
      form.append('text', text) // ...texto nuevo
      file && form.append('postPicture', file.name) // ...agrega nombre foto, si la tiene
      form.append('file', file) // ...agrega el archivo
      return async (dispatch, getState) => {
        const response = await axios.post(`${API}/posts`, form, // Manda form en el body
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
    }catch(error){
      Swal.fire(error)
    }
    
  },
  // Traer todos los posteos
  getPosts: () => {
    return async (dispatch, getState) => {
      try{
        const response = await axios.get(`${API}/posts`)
        dispatch({
          type: 'GET_POSTS',
          payload: response.data.response
        })
      }catch(error){
        Swal.fire(error)
      }
     
    }
  },
  // Modificar un posteo
  submitPostModification: (newPost) => {
    try{
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
        const response = await axios.put(`${API}/posts`, form,
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
    }catch(error){
      Swal.fire(error)
    }
    
  },
  // Enviar un nuevo comentario
  newComment: newComment => {
    try{
      const {
        postId, // ID del posteo
        comment, // Comentario
        token
      } = newComment
      return async (dispatch, getState) => {
        const response = await axios.post(`${API}/posts/comments`, { postId, comment },
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
    }catch(error){
      Swal.fire(error)
    } 
  },
  // Likear un posteo
  sendLikePost: likePost => {
    try{
      const {
        postId, // ID del posteo
        token
      } = likePost
      return async (dispatch, getState) => {
        const response = await axios.post(`${API}/posts/like`, { postId },
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
    }catch(error){
      Swal.fire(error)
    }
  },
  // Dislikear un posteo
  sendDislikePost: (dislikePost) => {
    try{
      const { postId, token } = dislikePost
      return async (dispatch, getState) => {
        const response = await axios.delete(`${API}/posts/dislike/${postId}`,
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
    }catch(error){
      Swal.fire(error)
    }
  },
  // Eliminar un posteo
  removePost: remove => {
    try{
      const { postId, token } = remove
      return async (dispatch, getState) => {
        const response = await axios.delete(`${API}/posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        dispatch({ type: 'GET_POSTS', payload: response.data.response })
      }
    }catch(error){
      Swal.fire(error)
    }  
  },
  // Likear un comentario de un posteo
  likeCommentPost: (ids) => {
    try{
      const { idComment, postId, token } = ids
      return async (dispatch, getState) => {
        const response = await axios.post(`${API}/posts/likeComments`, { idComment, postId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        dispatch({ type: 'UPDATE_POST', payload: response.data.response })
      }
    }catch(error){
      Swal.fire(error)
    }
    
  },
  // Dislikear un comentario de un posteo
  dislikeCommentPost: (ids) => {
    try{
      const { idComment, postId, token } = ids
      return async (dispatch, getState) => {
        const response = await axios.delete(`${API}posts/dislikeComments/${idComment}/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        dispatch({ type: 'UPDATE_POST', payload: response.data.response })
      }
    }catch(error){
      Swal.fire(error)
    }
  
  },
  // Eliminar un comentario
  deleteCommentPost: commentDelete => {
    try{
      const { postId, idComment, token } = commentDelete
      return async (dispatch, getState) => {
        const response = await axios.delete(`${API}/posts/comments/${postId}/${idComment}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        dispatch({ type: 'UPDATE_POST', payload: response.data.response })
      }
    }catch(error){
      Swal.fire(error)
    }  
  },
  // Editar un comentario
  editCommentPost: (modifiedComment) => {
    try{
      const { idComment, postId, newCommentEdit, token } = modifiedComment
      return async (dispatch, getState) => {
        const response = await axios.put(`${API}/posts/comments`, { idComment, postId, newCommentEdit },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        dispatch({ type: 'UPDATE_POST', payload: response.data.response })
      }
    }catch(error){
      Swal.fire(error)
    }
    }  
}

export default postActions