import _ from 'lodash';
import { 
    GET_POST_COMMENTS,
    GET_COMMENT,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    CREATE_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT

} from '../actions/comments'

const commentsReducer = (state = {}, action) => {
    const { type } = action
    switch(type) {
        case GET_POST_COMMENTS:
            const { comments } = action
            return _.mapKeys(comments, 'id')
        case GET_COMMENT:
        case UPDATE_COMMENT:
        case UPVOTE_COMMENT:
        case DOWNVOTE_COMMENT:
        case CREATE_COMMENT:
            const { comment } = action
            return {
                ...state,
                [comment.id]: comment
            }
        case DELETE_COMMENT:
            const { commentId } = action
            return _.omit(state, commentId)
        default:
           return state
    }
}

export default commentsReducer