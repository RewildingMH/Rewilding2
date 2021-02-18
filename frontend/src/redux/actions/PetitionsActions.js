import axios from 'axios'
//ACTIONS QUE RECIBE TODAS LAS ACCIONES RELACIONADAS A LAS PETICIONES
const petitionsActions = {
  //PIDE TODAS LAS PETICIONES AL SERVIDOR
  getPetitions: () => {
    return async (dispatch, getState) => {
      const response = await axios.get('http://localhost:4000/api/petitions')
      dispatch({ type: 'ALL_PETITIONS', payload: response.data.response })
    }
  },
  //CADA VEZ QUE EL USUARIO ENTRA A UNA PETICIÓN, AGREGA UNA VISITA
  addVisit: (petId) => {
    return async (dispatch, getState) => {
      const response = await axios.post('http://localhost:4000/api/petitions/visits', { petId })
      dispatch({ type: 'ADD_PETITIONS', payload: response.data.response })
    }
  },
  //FIRMA UNA PETICIÓN (PUEDE TENER COMENTARIO O NO Y NO SE PUEDE FIRMAR DOS VECES, PERO SI COMENTAR)
  signPetition: userSign => {
    return async (dispatch, getState) => {
      const response = await axios.post('http://localhost:4000/api/signPetition', { userSign },
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
  },
  //AGREGA UNA PETICIÓN, QUE DEBE SER ACEPTADA POR UN ADMINISTRADOR
  addPetition: (petition, file) => {
    console.log(file.result)
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
      const response = await axios.post('http://localhost:4000/api/petitions', form,
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
  },

}

export default petitionsActions