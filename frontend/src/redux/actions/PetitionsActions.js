import axios from 'axios'
import { API } from '../../Components/Api'
import Swal from 'sweetalert2';
//ACTIONS QUE RECIBE TODAS LAS ACCIONES RELACIONADAS A LAS PETICIONES
const petitionsActions = {
  //PIDE TODAS LAS PETICIONES AL SERVIDOR
  getPetitions: () => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.get(`${API}/petitions`)
        dispatch({ type: 'ALL_PETITIONS', payload: response.data.response })
      } catch (error) {
        Swal.fire(error)
      }
    }
  },
  //CADA VEZ QUE EL USUARIO ENTRA A UNA PETICIÓN, AGREGA UNA VISITA
  addVisit: (petId) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post(`${API}/petitions/visits`, { petId })
        dispatch({ type: 'ADD_PETITIONS', payload: response.data.response })
      } catch (error) {
        Swal.fire(error)
      }

    }
  },
  //FIRMA UNA PETICIÓN (PUEDE TENER COMENTARIO O NO Y NO SE PUEDE FIRMAR DOS VECES, PERO SI COMENTAR)
  signPetition: userSign => {
    try {
      return async (dispatch, getState) => {
        const response = await axios.post(`${API}/signPetition`, { userSign },
          {
            headers: {
              Authorization: `Bearer ${userSign.token}`,
            },
          }
        )

        dispatch({
          type: 'UPDATE_PETITION',
          payload: response.data.response
        })
      }
    } catch (error) {
      Swal.fire(error)
    }

  },
  //AGREGA UNA PETICIÓN, QUE DEBE SER ACEPTADA POR UN ADMINISTRADOR
  addPetition: (petition, file) => {
    try {
      const {
        limitDate,//LÍMITE DE TIEMPO PARA FIRMAR
        description,
        title,
        destination,//A QUIEN SE LE HACE LA PETICIÓN
        token,
        goal//LÍMITE DE FIRMAS
      } = petition
      const form = new FormData()
      form.append('title', title)
      form.append('limitDate', limitDate)
      form.append('description', description)
      form.append('destination', destination)
      form.append('goal', goal)
      form.append('petitionPicture', file.result.name)
      form.append('file', file.result)
      return async (dispatch, getState) => {
        const response = await axios.post(`${API}/petitions`, form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/formdata',
            },
          })
        dispatch({
          type: 'SEND_PETITION',
          payload: response.data.response
        })
      }

    } catch (error) {
      Swal.fire(error)
    }
  },

}

export default petitionsActions