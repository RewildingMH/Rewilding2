import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { petitionsReducer } from './petitionsReducer'

const reducer = combineReducers({
  petitionsR: petitionsReducer
})

const store = createStore(reducer, applyMiddleware(thunk))
export default store