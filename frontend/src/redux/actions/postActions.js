import axios from 'axios'

const postActions = {
  addPost: (post, file) => {
    const {
      text,
      token
    } = post
    const form = new FormData()
    form.append('text', text)
    form.append('postPicture', file.name)
    form.append('file', file)
    return async (dispatch, getState) => {
      const response = await axios.post('http://localhost:4000/api/posts', form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/formdata',
          },
        })
      dispatch({
        type: 'SEND_POST',
        payload: response.data.response
      })
    }
  },

}

export default postActions