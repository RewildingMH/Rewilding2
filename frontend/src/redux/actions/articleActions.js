import axios from "axios"

const articleActions = {
    newArticle: (newArticle, file, token) => {
        return async (dispatch, getState) => {
            const form = new FormData()
            form.append('title',newArticle.title)
            form.append('descripcion',newArticle.descripcion)
            form.append('articleCategory',newArticle.articleCategory)
            form.append('file', file)
            const respuesta = await axios.post('http://localhost:4000/api/blog', form, {
                 headers:{
                     'Authorization': `Bearer ${token}`,
                     'Content-Type':'multipart/formdata'
             }})
             if (!respuesta.data.success) {
                 return respuesta.data
             }
            dispatch({type: 'ADD_ARTICLE', payload: respuesta.data})
        }
    },
    getArticles: () => {
        return async(dispatch, getState) => {
            const response = await axios.get('http://localhost:4000/api/blog')
            dispatch({type: 'GET_ARTICLES', payload: response.data.response})
        }
    },
    editArticle:(article)=>{
        
        return async(dispatch, getState) => {
            try{
                const response = await axios.put('http://localhost:4000/api/blog', {article})
                dispatch({type: 'UPDATE_ARTICLE', payload: response.data.response})
            }
            catch(error){
                console.log(error)
              }
        }   
    },
    deleteArticle:(id) => {
        return async (dispatch, getState) => {
          const response = await axios.put('http://localhost:4000/api/blog/delete',{id})
          dispatch({ type: 'DELETE_ARTICLE', payload: response.data.response })
        }
      },
    commentArticle: newComment => {
        const {comment, token, artId} = newComment
        
        return async(dispatch, getState) => {
            const response = await axios.post('http://localhost:4000/api/article/comment', {comment, artId}, 
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({type: 'COMMENT_ARTICLE', payload: response.data.response})
        }
    },
    deleteComment: remove => {
        const { artId, token, commentId } = remove
        return async (dispatch, getState) => {
          const response = await axios.delete(`http://localhost:4000/api/article/comment/${artId}/${commentId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          dispatch({ type: 'DELETE_COMMENT', payload: response.data.response })
          console.log(response)
        }
      },
      editComment: (reComment) => {
        const {commentId, artId, editComment, token } = reComment
        console.log(reComment)
        return async (dispatch, getState) => {
          const response = await axios.put('http://localhost:4000/api/article/comment', { artId, commentId, editComment },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          dispatch({ type: 'EDIT_COMMENT', payload: response.data.response })
        }
      }
}

export default articleActions