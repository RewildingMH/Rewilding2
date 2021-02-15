import axios from "axios"

const articleActions = {
    newArticle: (newArticle, file, token) => {
        return async (dispatch, getState) => {
            console.log(newArticle, file)
            const form = new FormData()
            form.append('title',newArticle.title)
            form.append('descripcion',newArticle.descripcion)
            form.append('articleCategory',newArticle.articleCategory)
            form.append('picture', file.name)
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
    }
    
}

export default articleActions