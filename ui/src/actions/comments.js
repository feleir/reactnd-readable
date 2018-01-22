import { 
    fetchPostComments,
    fetchComment,
    commentUpdate,
    commentUpVote,
    commentDownVote,
    commentCreate,
    commentDelete,
} from '../utils/api'

export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const GET_COMMENT = 'GET_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'

export function getPostComments(postId) {
    return dispatch => {
        fetchPostComments(postId)
            .then(response => {
                dispatch({
                    type: GET_POST_COMMENTS,
                    postId,
                    comments: response
                })
            })
    }
}

export function getComment(commentId) {
    return dispatch => {
        fetchComment(commentId)
        .then(response => {
            dispatch({
                type: GET_COMMENT,
                comment: response
            })
        })
    }
}

export function upVoteComment(commentId) {
    return dispatch => {
        commentUpVote(commentId)
        .then(response => {
            dispatch({
                type: UPVOTE_COMMENT,
                comment: response               
            })
        })
    }
}

export function downVoteComment(commentId) {
    return dispatch => {
        commentDownVote(commentId)
            .then(response => {
                dispatch({
                    type: DOWNVOTE_COMMENT,
                    comment: response           
                })
            })
    }
}

export function createComment(values) {
    return dispatch => {
        return commentCreate(values)
            .then(response => {
                dispatch({
                    type: CREATE_COMMENT,
                    comment: response
                })
            })
    }
}

export function updateComment(commentId, values) {
    return dispatch => {
        return commentUpdate(commentId, values)
            .then(response => {
                dispatch({
                    type: UPDATE_COMMENT,
                    comment: response
                })
            })
    }
}

export function deleteComment(commentId) {
    return dispatch => {
        commentDelete(commentId)
            .then(response => {
                dispatch({
                    type: DELETE_COMMENT,
                    commentId
                })
            })
    }
}