import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import sort from './sort'

export default combineReducers({
    categories,
    posts,
    sort
})