import { GET_CATEGORIES } from '../actions'

const categories = (state = {}, action) => {
    const { type, categories } = action
    switch(type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories
            }
        default:
            return state
    }
}

export default categories