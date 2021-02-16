const initialState = {
  allPosts: []
}


export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POSTS':
      return {
        ...state,
        allPosts: action.payload
      }
    case 'ADD_COMMENT':
      return {
        ...state,
        allPosts: state.allPosts.map(post => post._id === action.payload._id ? action.payload : post)
      }
    default:
      return state
  }
}