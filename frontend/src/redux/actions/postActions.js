import axios from 'axios'

const postActions = {
  addPost: (post, file) => {
    const {
      text,
      token
    } = post
    const form = new FormData()
    form.append('text', text)
    file && form.append('postPicture', file.name)
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

  getPosts: () => {
    return async (dispatch, getState) => {
      const response = await axios.get('http://localhost:4000/api/posts')
      dispatch({ type: 'GET_POSTS', payload: response.data.response })
    }
  },
  newComment: newComment => {
    const { postId, comment, token } = newComment
    return async (dispatch, getState) => {
      const response = await axios.post('http://localhost:4000/api/posts/comments', { postId, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      dispatch({
        type: 'ADD_COMMENT',
        payload: response.data.response
      })
    }
  },

  sendLikePost: likePost => {
    const { postId, token } = likePost
    return async (dispatch, getState) => {
      const response = await axios.post('http://localhost:4000/api/posts/like', { postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      dispatch({
        type: 'LIKE_POST',
        payload: response.data.response
      })
    }
  },
  sendDislikePost: dislikePost => {
    const { postId, token } = dislikePost
    return async (dispatch, getState) => {
      const response = await axios.delete(`http://localhost:4000/api/posts/dislike/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      dispatch({
        type: 'LIKE_POST',
        payload: response.data.response
      })
    }
  }

}

export default postActions