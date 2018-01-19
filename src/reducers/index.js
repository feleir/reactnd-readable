import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import sort from './sort'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    categories,
    posts,
    sort,
    form: formReducer
})