const initialState = {profileUser: []}

export function profileReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_PROFILE':
            console.log(action.payload)
            return {
                ...state,
                profileUser: action.payload
    }
    default: 
        return state
}
}
