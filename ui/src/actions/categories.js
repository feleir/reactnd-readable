import { fetchCategories } from '../utils/api'
export const GET_CATEGORIES = 'GET_CATEGORIES'

export function getCategories() {
    return dispatch => {
        return fetchCategories()
        .then(response => {
            dispatch({
                type: GET_CATEGORIES,
                categories: response.categories
            })
        })
    }
}