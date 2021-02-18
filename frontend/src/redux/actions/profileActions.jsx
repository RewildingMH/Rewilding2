import axios from 'axios'

const profileActions = {

    getUsersById: (id) => {
        return async (dispatch, getState) => {
        const response = await axios.get(`http://localhost:4000/api/profile/${id}`)
        dispatch({
            type: 'GET_PROFILE',
            payload: response.data.response
        })
        }
    },

}

export default profileActions