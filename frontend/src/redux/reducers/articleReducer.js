const initialState = {
    articles: [],
    articleCategories:["Respect for animals", "Biodiversity", "DANGER OF EXTINCTION"]
}


export function articleReducer  (state = initialState, action){
    switch(action.type){
        case 'ADD_ARTICLE':
            return {
                ...state,
                articles: action.payload
            }
        case 'GET_ARTICLES':
            return {
                ...state,
                articles: action.payload
            }
        default:
            return state
    }
}
