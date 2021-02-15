import axios from "axios";

const userActions = {
  likeReason: (likeds) => {
    const { petId, id, token } = likeds
    return async (dispatch, getState) => {
      const respuesta = await axios.post(
        'http://127.0.0.1:4000/api/petitions/like/',
        { petId, id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    }
  }
}

export default userActions