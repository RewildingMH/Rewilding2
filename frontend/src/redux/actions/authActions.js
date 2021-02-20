import axios from "axios"

const authActions = {
    newUser: (newUser, file) => {
        return async (dispatch, getState) => {
            const form = new FormData()
            form.append('name',newUser.name)
            form.append('lastName',newUser.lastName)
            form.append('username',newUser.username)
            form.append('password',newUser.password)
            form.append('profilePicture', file.name)
            form.append('file', file.result)
            const respuesta = await axios.post('http://localhost:4000/api/user/signup', form, {headers:{'Content-Type':'multipart/formdata'}})
            if (!respuesta.data.success) {
                return respuesta.data
            }
            dispatch({type: 'LOG_USER', payload: respuesta.data})
        }
    },
    loginWithGoogle:(response)=>{
        return async (dispatch, getState) => {
            const respuesta = await axios.post('http://localhost:4000/api/user/sign_google', response)
            if (!respuesta.data.success) {
                console.log(respuesta)
                return false
            }else{
                console.log(respuesta)
            }
            dispatch({type:'LOG_USER', payload: respuesta.data})
        }
    },
    loginUser: (user) => {
        return async (dispatch, getState) => {
            console.log(user)
            const respuesta = await axios.post('http://localhost:4000/api/user/signin', user)
            if (!respuesta.data.success) {
                return respuesta.data
            }
            dispatch({type:'LOG_USER', payload: respuesta.data})
        }
    },
    logoutUser: () => {
        return (dispatch, getState) => {
            dispatch({type: 'LOG_OUT_USER'})
        }
    },
    //logueo desde local storage
    logFromLS: (token) => {
        return async (dispatch, getState) => {
            try {
                const respuesta = await axios.post('http://localhost:4000/api/user/ls', {token}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                dispatch({type: 'LOG_USER', payload: {response: {...respuesta.data.response}}})
            } catch(err) {
                alert("Access denied")
                localStorage.clear()
                return '/'         
            }
        }
    }
}

export default authActions