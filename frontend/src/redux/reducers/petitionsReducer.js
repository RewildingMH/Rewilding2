const initialState = {
  allPetitions: []
}


export const petitionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL_PETITIONS':
      return {
        ...state,
        allPetitions: action.payload
      }
    case 'SIGN_PETITION':
      return {
        ...state,
        allPetitions: state.allPetitions.map(petition => petition._id === action.payload._id ? action.payload : petition)
      }
    // case 'SIGN_PETITION':
    //   return {
    //     ...state,
    //     reasons: state.reasons.map(reasons => reasons._id === action.payload._id ? reasons = action.payload : reasons)
    //   }
    default:
      return state
  }
}