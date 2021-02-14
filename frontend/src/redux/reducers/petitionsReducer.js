const initialState = {
  allPetitions: [],
  reasons: []
}


export const petitionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL_PETITIONS':
      return {
        ...state,
        allPetitions: action.payload
      }
    case 'GET_REASONS':
      return {
        ...state,
        reasons: action.payload.map(({ reasons }) => reasons)
      }
    case 'SIGN_PETITION':
      return {
        ...state,
        reasons: state.reasons.map(reasons => reasons._id === action.payload._id ? reasons = action.payload : reasons)
      }
    default:
      return state
  }
}