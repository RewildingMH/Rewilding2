import axios from "axios"
import { API } from "../../Components/Api"
import  Swal  from 'sweetalert2';

const articleActions = {
    newArticle: (newArticle, file, token) => {
      console.log(newArticle)
        return async (dispatch, getState) => {
          try{
            const form = new FormData()
            form.append('title',newArticle.title)
            form.append('descripcion',newArticle.descripcion)
            form.append('articleCategory',newArticle.articleCategory)
            form.append('file', file.result)
            const respuesta = await axios.post(`${API}/blog`, form, {
                 headers:{
                     'Authorization': `Bearer ${token}`,
                     'Content-Type':'multipart/formdata'
             }})
             if (!respuesta.data.success) {
                 return respuesta.data
             }
            dispatch({type: 'ADD_ARTICLE', payload: respuesta.data.response})
            console.log(respuesta)
        }catch(error){
          Swal.fire(error)
        }
          }
          
    },
    getArticles: () => {
      try{
        return async(dispatch, getState) => {
            const response = await axios.get(`${API}/blog`)
            dispatch({type: 'GET_ARTICLES', payload: response.data.response})
        }
      }catch(error){
        Swal.fire(error)
      }    
    },
    editArticle:(article)=>{
        
        return async(dispatch, getState) => {
            try{
                const response = await axios.put(`${API}/blog`, {article})
                dispatch({type: 'UPDATE_ARTICLE', payload: response.data.response})
            }
            catch(error){
              Swal.fire(error)
              }
        }   
    },
    deleteArticle:(id) => {
        return async (dispatch, getState) => {
          const response = await axios.put(`${API}/blog/delete`,{id})
          dispatch({ type: 'DELETE_ARTICLE', payload: response.data.response })
        }
      },
    commentArticle: newComment => {
        const {comment, token, artId} = newComment      
        return async(dispatch, getState) => {
          try{
            const response = await axios.post(`${API}/article/comment`, {comment, artId}, 
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({type: 'COMMENT_ARTICLE', payload: response.data.response})
          }catch(error){
            Swal.fire(error)
          }
          
        }
    },
    deleteComment: remove => {
        const { artId, token, commentId } = remove
        return async (dispatch, getState) => {
          try{
            const response = await axios.delete(`${API}/article/comment/${artId}/${commentId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          dispatch({ type: 'DELETE_COMMENT', payload: response.data.response })
          }catch(error){
            Swal.fire(error)
          }
          
        }
      },
      editComment: (reComment) => {
        const {commentId, artId, editComment, token } = reComment
        return async (dispatch, getState) => {
          try{
            const response = await axios.put(`${API}/article/comment`, { artId, commentId, editComment },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })     
          dispatch({ type: 'EDIT_COMMENT', payload: response.data.response })
          }catch(error){
            Swal.fire(error)
          }
         
        }
      },
      addVisit: (artId) => {
        return async (dispatch, getState) => {
          try{
            const response = await axios.post(`${API}/articles/visits`, { artId })
            dispatch({ type: 'ADD_BLOG', payload: response.data.response })
          }catch(error){
            Swal.fire(error)
          }
         
        }
      },
}

export default articleActions