const initialState = {
    articles: [],
    articleCategories:["Respect for animals", "Biodiversity", "DANGER OF EXTINCTION", "Animals in the wild", "Ecology"]
}


export function articleReducer  (state = initialState, action){
    switch(action.type){
        case 'ADD_ARTICLE':
            return {
                ...state,
                articles: state.articles.map(article => article._id === action.payload._id ? action.payload : article)
            }
        case 'GET_ARTICLES':
            return {
                ...state,
                articles: action.payload
            }
        case 'UPDATE_ARTICLE':
            return {
                ...state,
                articles: state.articles.map(article => article._id === action.payload._id ? action.payload : article)
            }
        case 'DELETE_ARTICLE':
            return {
                ...state,
                articles: state.articles.map(article => article._id === action.payload._id ? action.payload : article)
            }
        case 'COMMENT_ARTICLE':
            return {
                ...state, 
                articles: action.payload 
            }
        default:
            return state
    }
}
