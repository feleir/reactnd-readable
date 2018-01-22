export const SORT_POSTS_BY_KEY = 'SORT_POSTS_BY_KEY'

export function sortPostsByKey(key) {
    return {
        type: SORT_POSTS_BY_KEY,
        key
    }
}