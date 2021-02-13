import axios from axios

const PetitionsActions = {
  getPetitions: () => {
    return async (dispatch, getState) => {
      const response = await axios.get('http://localhost:4000/api/petitions')
      dispatch({ type: 'ALL_PETITIONS', payload: response.data.response })
    }
  }
}

export default PetitionsActions