import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { authReducer } from './authReducer'
import { petitionsReducer } from './petitionsReducer'


const reducer = combineReducers({
  authR: authReducer,
  petitionsR: petitionsReducer

})

const store = createStore(reducer, applyMiddleware(thunk))
export default store

