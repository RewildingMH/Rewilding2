import axios from "axios";

const userActions = {
  // Likear una razon de firma
  likeReason: (likeds) => {
    const { petId, id, token } = likeds
    return async (dispatch, getState) => {
      const response = await axios.post(
        'http://127.0.0.1:4000/api/petitions/like/',
        { petId, id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch({ type: 'LIKE', payload: response.data.response })
    }
  },
  // Dislikear una razon de firma
  dislikeReason: (dislikeds) => {
    const {
      petId, // ID de la peticion
      id, // ID de la razon
      token
    } = dislikeds
    return async (dispatch, getState) => {
      const response = await axios.delete(
        `http://127.0.0.1:4000/api/petitions/dislike/${petId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      dispatch({ type: 'DISLIKE', payload: response.data.response })
    }
  },
  // Borrar una razon de firma
  deleteReason: (deleteReason) => {
    const {
      petId, // ID de la peticion
      id, // ID de la razon
      token
    } = deleteReason
    return async (dispatch, getState) => {
      const response = await axios.delete(`http://localhost:4000/api/petitions/delete/${id}/${petId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },

        })
      dispatch({ type: 'DELETE_REASON', payload: response.data.response })
    }
  },
  // Modificar la razon de firma
  modifyReason: (reasonModify) => {
    const {
      id, // ID de la razon
      petId, // ID de la peticion
      modification, // Razon modificada
      token
    } = reasonModify
    return async (dispatch, getState) => {
      const response = await axios.put('http://localhost:4000/api/petitions/modifyReason', { id, petId, modification },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      dispatch({ type: 'MODIFY_REASON', payload: response.data.response })
    }
  }
}

export default userActions