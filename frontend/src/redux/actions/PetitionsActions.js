import axios from 'axios'

const PetitionsActions = {
  getPetitions: () => {
    return async (dispatch, getState) => {
      const response = await axios.get('http://localhost:4000/api/petitions')
      dispatch({ type: 'ALL_PETITIONS', payload: response.data.response })
    }
  },
  // addVisit: () => {
  //   return async (dispatch, getState) => {
  //     const response = await axios.get('http://localhost:4000/api/petitions')
  //     dispatch({ type: 'ADD_PETITIONS', payload: response.data.response })
  //   }
  // }

  signPetition: userSign => {
    return async (dispatch, getState) => {
      const response = await axios.post('http://localhost:4000/api/signPetition', { userSign })
    }
  },

  addPetition: petition => {
    return async (dispatch, getState) => {
      const response = await axios.post('http://localhost:4000/api/petitions', { petition })
    }
  }
}

export default PetitionsActions