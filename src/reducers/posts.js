import _ from 'lodash';
import { GET_POSTS, UPVOTE_POST, DOWNVOTE_POST } from '../actions/posts'

const postsReducer = (state = {}, action) => {
    const { type } = action
    switch(type) {
        case GET_POSTS:
            const { posts } = action
            return _.mapKeys(posts, 'id')
        case UPVOTE_POST:
        case DOWNVOTE_POST:
            const { post } = action
            return {
                ...state,
                [post.id]: post
            }
        default:
            return state
    }
}

export default postsReducer