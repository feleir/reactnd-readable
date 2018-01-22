import { GET_CATEGORIES } from '../actions/categories'

const categoriesReducer = (state = [], action) => {
    const { type } = action
    switch(type) {
        case GET_CATEGORIES:
            const { categories } = action
            return categories
        default:
            return state
    }
}

export default categoriesReducer