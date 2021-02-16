import axios from 'axios'

const PetitionsActions = {
  getPetitions: () => {
    return async (dispatch, getState) => {
      const response = await axios.get('http://localhost:4000/api/petitions')
      dispatch({ type: 'ALL_PETITIONS', payload: response.data.response })
    }
  },

  addVisit: (petId) => {
    return async (dispatch, getState) => {
      const response = await axios.post('http://localhost:4000/api/petitions/visits', { petId })
      dispatch({ type: 'ADD_PETITIONS', payload: response.data.response })
    }
  },

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
        type: 'SIGN_PETITION',
        payload: response.data.response
      })
    }
  },

  addPetition: (petition, file) => {
    const {
      limitDate,
      description,
      title,
      destination,
      token,
      goal
    } = petition
    const form = new FormData()
    form.append('title', title)
    form.append('limitDate', limitDate)
    form.append('description', description)
    form.append('destination', destination)
    form.append('goal', goal)
    form.append('petitionPicture', file.name)
    form.append('file', file)
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

export default PetitionsActions