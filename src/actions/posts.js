import { fetchPosts, postUpvote, postDownvote } from '../utils/api'
export const GET_POSTS = 'GET_POSTS'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const CREATE_POST = 'CREATE_POST'

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
}