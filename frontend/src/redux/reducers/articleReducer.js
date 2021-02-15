const initialState = {
    articles: null,
    articleCategories:["Respect for animals", "Biodiversity", "DANGER OF EXTINCTION"]
}


export function articleReducer  (state = initialState, action){
    switch(action.type){
        case 'ADD_ARTICLE':
            return {
                ...state,
                articles: action.payload
            }
        default:
            return state
    }
}
