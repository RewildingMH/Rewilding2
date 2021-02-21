const initialState = {profileUser: []}

export function profileReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_PROFILE':
            return {
                ...state,
                profileUser: action.payload
    }
    default: 
        return state
}
}
