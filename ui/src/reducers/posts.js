import _ from 'lodash';
import { 
    GET_POSTS, 
    UPVOTE_POST, 
    DOWNVOTE_POST, 
    CREATE_POST, 
    DELETE_POST, 
    GET_POST,
    UPDATE_POST
} from '../actions/posts'

const postsReducer = (state = {}, action) => {
    const { type } = action
    switch(type) {
        case GET_POSTS:
            const { posts } = action
            return _.mapKeys(posts, 'id')
        case UPDATE_POST:
        case GET_POST: 
        case UPVOTE_POST:
        case DOWNVOTE_POST:
        case CREATE_POST:
            const { post } = action
            return {
                ...state,
                [post.id]: post
            }
        case DELETE_POST:
            const { postId } = action
            return _.omit(state, postId)
        default:
            return state
    }
}

export default postsReducer