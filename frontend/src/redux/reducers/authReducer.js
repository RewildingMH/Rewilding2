const initialState = {
    loggedUser: null
}

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOG_USER':
            localStorage.setItem('name', action.payload.response.name)
            localStorage.setItem('profilePicture', action.payload.response.profilePicture)
            localStorage.setItem('token', action.payload.response.token)
            localStorage.setItem('username', action.payload.response.username)
            localStorage.setItem('rol', action.payload.response.rol)
            localStorage.setItem('userId', action.payload.response.userId)
            return {
                ...state,
                loggedUser: action.payload.response
            }
        case 'LOG_OUT_USER':
            localStorage.clear()
            return {
                ...state,
                loggedUser: null
            }
        default:
            return state
    }
}

