import { guid } from './helpers'

const url = process.env.API_URL
const authorization = process.env.API_AUTHENTICATION_KEY

const POST_TYPE = 'posts'
const COMMENT_TYPE = 'comments'

const vote = (type, id, option) => {
    const postUrl = `${url}/${type}/${id}`
    return fetch(postUrl, { method: 'POST' , 
            headers: { 
                'Authorization': authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             },
            body: JSON.stringify({
                option: option
            })
        })
        .then(response => response.json())
}

const update = (type, postId, values) => {
    return fetch(`${url}/${type}/${postId}`, 
        { 
            method: 'PUT' , 
            headers: { 
                'Authorization': authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(values)
        })
        .then(response => response.json())
}

const create = (type, values)  => {
    return fetch(`${url}/${type}`, { method: 'POST' , 
            headers: { 
                'Authorization': authorization,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(values)
        })
        .then(response => response.json())
}

const remove = (type, id) => {
    return fetch(`${url}/${type}/${id}`, 
        { 
            method: 'DELETE',
            headers: {
                'Authorization': authorization
            }
        })
}

export function fetchCategories() {
    return fetch(`${url}/categories`, { headers: { 'Authorization': authorization }})
        .then(response => response.json())
}

export function fetchPosts(category) {
    const getUrl = category ? `${url}/${category}/posts` : `${url}/posts`;
    return fetch(getUrl, { headers: { 'Authorization': authorization }})
        .then(response => response.json())
}

export function fetchPost(postId) {
    const getUrl = `${url}/posts/${postId}`;
    return fetch(getUrl, { headers: { 'Authorization': authorization }})
        .then(response => response.json())
}

export function postUpvote(postId) {
    return vote(POST_TYPE, postId, 'upVote');
}

export function postDownvote(postId) {
    return vote(POST_TYPE, postId, 'downVote');
}

export function postDelete(postId) {
    return remove(POST_TYPE, postId)
}

export function postCreate(values) {
    const { title, body, author, category } = values
    const data = {
        id: guid(),
        timestamp: Date.now(),
        title,
        body,
        author,
        category
    }
    
    return create(POST_TYPE, data)
}

export function postUpdate(postId, values) {
    return update(POST_TYPE, postId, values)
}

export function fetchPostComments(postId) {
    return fetch(`${url}/posts/${postId}/comments`,
            {
                headers: {
                    'Authorization': authorization,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        .then(response => response.json());
}

export function commentCreate(values) {
    const {  body, author, parentId } = values
    const data = {
        id: guid(),
        timestamp: Date.now(),
        body,
        author,
        parentId
    }

    return create(COMMENT_TYPE, data)
}

export function fetchComment(commentId) {
    const getUrl = `${url}/comments/${commentId}`;
    return fetch(getUrl, { headers: { 'Authorization': authorization }})
        .then(response => response.json())
}

export function commentUpVote(postId) {
    return vote(COMMENT_TYPE, postId, 'upVote');
}

export function commentDownVote(postId) {
    return vote(COMMENT_TYPE, postId, 'downVote');
}

export function commentUpdate(commentId, values) {
    const {  body } = values
    const data = {
        timestamp: Date.now(),
        body
    }

    return update(COMMENT_TYPE, commentId, data)
}

export function commentDelete(commentId) {
    return remove(COMMENT_TYPE, commentId)
}
