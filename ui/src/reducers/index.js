import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import sort from './sort'
import comments from './comments'
import { reducer as form } from 'redux-form'

export default combineReducers({
    categories,
    posts,
    sort,
    comments,
    form
})