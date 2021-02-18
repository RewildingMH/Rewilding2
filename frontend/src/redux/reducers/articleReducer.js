const initialState = {
    allArticles: [],
    articlePort: [],
    singleArticle: [],
    articlePortMini: [],
    articlesList: [],
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
                allArticles: action.payload,
                articlePort: action.payload.slice(action.payload.length - 1, action.payload.length),
                articlePortMini: action.payload.slice(action.payload.length - 2, action.payload.length- 1),
                articlesList: action.payload.slice(0, action.payload.length- 2),
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
