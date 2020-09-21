import {combineReducers} from 'redux'
import AuthReducers from './Authreducers'
import SearchReducers from './Searchreducers'

export default combineReducers({
    Auth:AuthReducers,
    Search:SearchReducers
})