const initialState = {
  allPetitions: [],
  lastPetitions: []
}


export const petitionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL_PETITIONS':
      return {
        ...state,
        allPetitions: action.payload,
        lastPetitions: action.payload.slice(action.payload.length -3, action.payload.length)
      }
    case 'UPDATE_PETITION':
      return {
        ...state,
        allPetitions: state.allPetitions.map(petition => petition._id === action.payload._id ? action.payload : petition)
      }
    case 'LIKE':
      return {
        ...state,
        allPetitions: state.allPetitions.map(petition => petition._id === action.payload._id ? action.payload : petition)
      }
    case 'DISLIKE':
      return {
        ...state,
        allPetitions: state.allPetitions.map(petition => petition._id === action.payload._id ? action.payload : petition)
      }
    case 'DELETE_REASON':
      return {
        ...state,
        allPetitions: state.allPetitions.map(petition => petition._id === action.payload._id ? action.payload : petition)
      }
    case 'MODIFY_REASON':
      return {
        ...state,
        allPetitions: state.allPetitions.map(petition => petition._id === action.payload._id ? action.payload : petition)
      }
    default:
      return state
  }
}