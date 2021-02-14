<<<<<<< HEAD
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { petitionsReducer } from './petitionsReducer'

const reducer = combineReducers({
  petitionsR: petitionsReducer
})

const store = createStore(reducer, applyMiddleware(thunk))
export default store
=======
import {createStore, combineReducers, applyMiddleware}  from 'redux'
import thunk  from 'redux-thunk'
import {authReducer} from './authReducer'
import { petitionsReducer } from './petitionsReducer'


const reducer = combineReducers({
    authR: authReducer,
    petitionsR: petitionsReducer

})

const store= createStore(reducer, applyMiddleware(thunk))
export default store

>>>>>>> 32a42d230b0de776a9e0a69899b4d3bbcce11fd6
