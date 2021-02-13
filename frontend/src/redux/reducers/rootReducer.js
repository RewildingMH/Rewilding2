import {createStore, combineReducers, applyMiddleware}  from 'redux'
import thunk  from 'redux-thunk'
import {authReducer} from './authReducer'

const reducer = combineReducers({
    authReducer
})

const store= createStore(reducer, applyMiddleware(thunk))
export default store