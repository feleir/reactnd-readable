import { SORT_POSTS_BY_KEY } from '../actions/sort'

const sortReducer = (state = {}, action) => {
    const { type } = action
    switch(type) {
        case SORT_POSTS_BY_KEY:
            const { key } = action
            return {
                ...state,
                posts: key
            }
        default:
            return state
    }
}

export default sortReducer