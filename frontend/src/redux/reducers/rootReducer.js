import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { authReducer } from './authReducer'
import { petitionsReducer } from './petitionsReducer'
import { articleReducer } from './articleReducer'


const reducer = combineReducers({
  authR: authReducer,
  petitionsR: petitionsReducer,
  articleR: articleReducer
})

const store = createStore(reducer, applyMiddleware(thunk))
export default store

