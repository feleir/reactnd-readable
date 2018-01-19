import { 
    fetchPosts, 
    fetchPost,
    postUpvote, 
    postDownvote, 
    postCreate, 
    postDelete, 
    postUpdate
} from '../utils/api'

export const GET_POSTS = 'GET_POSTS'
export const GET_POST = 'GET_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'

export function getPosts(category) {
    return dispatch => {
        fetchPosts(category)
        .then(response => {
            dispatch({
                type: GET_POSTS,
                posts: response
            })
        })
    }
}

export function getPost(postId) {
    return dispatch => {
        fetchPost(postId)
        .then(response => {
            dispatch({
                type: GET_POST,
                post: response
            })
        })
    }
}

export function upVotePost(postId) {
    return dispatch => {
        postUpvote(postId)
        .then(response => {
            dispatch({
                type: UPVOTE_POST,
                post: response               
            })
        })
    }
}

export function downVotePost(postId) {
    return dispatch => {
        postDownvote(postId)
            .then(response => {
                dispatch({
                    type: DOWNVOTE_POST,
                    post: response           
                })
            })
    }
}

export function createPost(values) {
    return dispatch => {
        return postCreate(values)
            .then(response => {
                dispatch({
                    type: CREATE_POST,
                    post: response
                })
            })
    }
}

export function updatePost(postId, values) {
    return dispatch => {
        return postUpdate(postId, values)
            .then(response => {
                dispatch({
                    type: UPDATE_POST,
                    post: response
                })
            })
    }
}

export function deletePost(postId) {
    return dispatch => {
        postDelete(postId)
            .then(response => {
                dispatch({
                    type: DELETE_POST,
                    postId
                })
            })
    }
}