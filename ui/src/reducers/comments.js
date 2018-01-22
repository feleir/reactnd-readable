import _ from 'lodash';
import { 
    GET_POST_COMMENTS,
    GET_COMMENT,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    CREATE_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    COMMENT_ERROR
} from '../actions/comments'

const commentsReducer = (state = {}, action) => {
    const { type } = action
    const { commentId } = action

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
            return _.omit(state, commentId)
        case COMMENT_ERROR:
            return {
                ...state,
                [commentId]: null
            }      
        default:
           return state
    }
}

export default commentsReducer