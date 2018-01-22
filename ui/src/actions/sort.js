export const SORT_POSTS_BY_KEY = 'SORT_POSTS_BY_KEY'

export const SORT_BY_TIMESTAMP = 'timestamp'
export const SORT_BY_VOTE_SCORE = 'voteScore'
export const SORT_BY_ASCENDING = 'ascending'
export const SORT_BY_DESCENDING = 'descending'

export const sortByOptions = [
    { key: SORT_BY_TIMESTAMP, description: "By Date ascending", order: SORT_BY_ASCENDING  },
    { key: SORT_BY_TIMESTAMP, description: "By Date descending", order: SORT_BY_DESCENDING  },
    { key: SORT_BY_VOTE_SCORE, description: "By score ascending", order: SORT_BY_ASCENDING },
    { key: SORT_BY_VOTE_SCORE, description: "By score descending", order: SORT_BY_DESCENDING },
]

export function sortPostsByKey(key) {
    return {
        type: SORT_POSTS_BY_KEY,
        key
    }
}