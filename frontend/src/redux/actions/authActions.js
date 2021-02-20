import axios from "axios"
import { API } from './../../Components/Api';
import  Swal  from 'sweetalert2';

const authActions = {
    newUser: (newUser, file) => {
        return async (dispatch, getState) => {
            try{
                const form = new FormData()
                form.append('name',newUser.name)
                form.append('lastName',newUser.lastName)
                form.append('username',newUser.username)
                form.append('password',newUser.password)
                form.append('profilePicture', file.name)
                form.append('file', file)
                const respuesta = await axios.post(`${API}/user/signup`, form, {headers:{'Content-Type':'multipart/formdata'}})
                if (!respuesta.data.success) {
                    return respuesta.data
                }
                dispatch({type: 'LOG_USER', payload: respuesta.data})
            }catch(error){
                Swal.fire(error)
            }
           
        }
    },
    loginWithGoogle:(response)=>{
        return async (dispatch, getState) => {
            try{
                const respuesta = await axios.post(`${API}/user/sign_google`, response)
                if (!respuesta.data.success) {
                    console.log(respuesta)
                    return false
                }else{
                    console.log(respuesta)
                }
                dispatch({type:'LOG_USER', payload: respuesta.data})
            }catch(error){
                Swal.fire(error)
            }
            
        }
    },
    loginUser: (user) => {
        return async (dispatch, getState) => {
            try{
                const respuesta = await axios.post(`${API}/user/signin`, user)
                if (!respuesta.data.success) {
                    return respuesta.data
                }
                dispatch({type:'LOG_USER', payload: respuesta.data})
            }catch(error){
                Swal.fire(error)
            }
          
        }
    },
    logoutUser: () => {
        return (dispatch, getState) => {
            try{
             dispatch({type: 'LOG_OUT_USER'})   
            }catch(error){
                Swal.fire(error)
            }
            
        }
    },
    //logueo desde local storage
    logFromLS: (token) => {
        return async (dispatch, getState) => {
            try {
                const respuesta = await axios.post(`${API}/user/ls`, {token}, {
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