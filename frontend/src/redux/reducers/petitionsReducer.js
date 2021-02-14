const initialState = {
  allPetitions: []
}


export const petitionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL_PETITIONS':
      return {
        ...state,
        petitions: action.payload
      }
    default:
      return state
  }
}