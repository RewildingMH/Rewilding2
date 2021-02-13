import axios from "axios"
import swal from 'sweetalert2'

const authActions = {
    newUser: (newUser, file) => {
        console.log(newUser)
        return async (dispatch, getState) => {
            const form = new FormData()
            form.append('name',newUser.name)
            form.append('lastName',newUser.lastName)
            form.append('username',newUser.username)
            form.append('password',newUser.password)
            form.append('country',newUser.country)
            form.append('profilePicture', file.name)
            form.append('file', file)
            const respuesta = await axios.post('http://localhost:4000/user/signup', form, {headers:{'Content-Type':'multipart/formdata'}})
            if (!respuesta.data.success) {
                return respuesta.data
            }
            dispatch({type: 'LOG_USER', payload: respuesta.data})
        }
    },
    loginWithGoogle:(response)=>{
        return async (dispatch, getState) => {
            const respuesta = await axios.post('http://localhost:4000/user/sign_google', response)
            if (!respuesta.data.success) {
                swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Something happened. Try again',
                    showConfirmButton: false,
                    timer: 1500
                  })
                return false
            }else{
                swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Welcome to Mytinerary',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
            dispatch({type:'LOG_USER', payload: respuesta.data})
        }
    },
    loginUser: (user) => {
        return async (dispatch, getState) => {
            console.log(user)
            const respuesta = await axios.post('http://localhost:4000/user/signin', user)
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
                const respuesta = await axios.post('http://localhost:4000/user/ls', {token}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                dispatch({type: 'LOG_USER', payload: {response: {...respuesta.data.response}}})
            } catch(err) {
                if (err.response.status === 401) {
                    alert("Access denied")
                    localStorage.clear()
                    return '/'
                }
            }
        }
    },
    getCountries:() => {
        return async (dispatch, getState) => {
            const respuesta = await axios.get('https://restcountries.eu/rest/v2/all')
            dispatch({type:'GET_COUNTRIES', payload: respuesta})
        }
    },

}

export default authActions