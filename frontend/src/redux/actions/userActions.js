import axios from "axios";
import  Swal  from 'sweetalert2';
import { API } from './../../Components/Api';

const userActions = {
  // Likear una razon de firma
  likeReason: (likeds) => {
    try{
      const { petId, id, token } = likeds
      return async (dispatch, getState) => {
        const response = await axios.post(
          `${API}/petitions/like/`,
          { petId, id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        dispatch({ type: 'LIKE', payload: response.data.response })
      }
    }catch(error){
      Swal.fire(error)
    }
  },
  // Dislikear una razon de firma
  dislikeReason: (dislikeds) => {
    console.log(dislikeds)
    try{
      const {
        petId, // ID de la peticion
        id, // ID de la razon
        token
      } = dislikeds
      return async (dispatch, getState) => {
        const response = await axios.delete(`${API}/petitions/dislike/${petId}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        dispatch({ type: 'DISLIKE', payload: response.data.response })
      }
    }catch(error){
      Swal.fire(error)
    }
   
  },
  // Borrar una razon de firma
  deleteReason: (deleteReason) => {
    console.log(deleteReason)
    try{
      const {
        petId, // ID de la peticion
        id, // ID de la razon
        token
      } = deleteReason
      return async (dispatch, getState) => {
        const response = await axios.delete(`${API}/petitions/delete/${id}/${petId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
  
          })
        dispatch({ type: 'DELETE_REASON', payload: response.data.response })
      }
    }catch(error){
      Swal.fire(error)
    }
   
  },
  // Modificar la razon de firma
  modifyReason: (reasonModify) => {
    try{
      const {
        id, // ID de la razon
        petId, // ID de la peticion
        modification, // Razon modificada
        token
      } = reasonModify
      return async (dispatch, getState) => {
        const response = await axios.put(`${API}/petitions/modifyReason`, { id, petId, modification },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        dispatch({ type: 'MODIFY_REASON', payload: response.data.response })
      }
    }catch(error){
      Swal.fire(error)
    }
  
  },

  recoverPassword: email => {
    try{
      return async (dispatch, getState) => {
        const response = await axios.post(`${API}/password/`, {email})
        if(response.data.success === false){
          Swal.fire(response.data.message)
        }
        dispatch({type: 'PASSWORD', payload: response.data.response})
        
      }
    }catch(error){
      Swal.fire(error)
    }
    
  }
}

export default userActions