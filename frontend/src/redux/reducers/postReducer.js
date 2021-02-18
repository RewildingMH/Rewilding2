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
    case 'ADD_POST':
      return {
        ...state,
        allPosts: state.allPosts.concat(action.payload)
      }
    case 'ADD_COMMENT':
      return {
        ...state,
        allPosts: state.allPosts.map(post => post._id === action.payload._id ? action.payload : post)
      }
    case 'LIKE_POST':
      return {
        ...state,
        allPosts: state.allPosts.map(post => post._id === action.payload._id ? action.payload : post)
      }
    case 'MODIFICATION_POST':
      return {
        ...state,
        allPosts: state.allPosts.map(post => post._id === action.payload._id ? action.payload : post)
      }
    case 'LIKE_COMMENT':
      return {
        ...state,
        allPosts: state.allPosts.map(post => post._id === action.payload._id ? action.payload : post)
      }
    case 'DELETE_COMMENT':
      return {
        ...state,
        allPosts: state.allPosts.map(post => post._id === action.payload._id ? action.payload : post)
      }
    case 'MODIFY_COMMENT':
      return {
        ...state,
        allPosts: state.allPosts.map(post => post._id === action.payload._id ? action.payload : post)
      }
    default:
      return state
  }
}