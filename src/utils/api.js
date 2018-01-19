import { guid } from './helpers'
const url = 'http://localhost:3001'

export function fetchCategories() {
    return fetch(`${url}/categories`, { headers: { 'Authorization': 'whatever-you-want' }})
        .then(response => response.json())
}

export function fetchPosts(category) {
    const getUrl = category ? `${url}/${category}/posts` : `${url}/posts`;
    return fetch(getUrl, { headers: { 'Authorization': 'whatever-you-want' }})
        .then(response => response.json())
}

export function fetchPost(postId) {
    const getUrl = `${url}/posts/${postId}`;
    return fetch(getUrl, { headers: { 'Authorization': 'whatever-you-want' }})
        .then(response => response.json())
}

const votePost = (postId, option) => {
    const postUrl = `${url}/posts/${postId}`
    return fetch(postUrl, { method: 'POST' , 
            headers: { 
                'Authorization': 'whatever-you-want',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             },
            body: JSON.stringify({
                option: option
            })
        })
        .then(response => response.json())
}

export function postUpvote(postId) {
    return votePost(postId, 'upVote');
}

export function postDownvote(postId) {
    return votePost(postId, 'downVote');
}

export function postDelete(postId) {
    const delUrl = `${url}/posts/${postId}`
    return fetch(delUrl, 
        { 
            method: 'DELETE',
            headers: {
                'Authorization': 'whatever-you-want'
            }
        })
}

export function postCreate(values) {
    const { title, body, author, category } = values;
    const postUrl = `${url}/posts/`
    const data = {
        id: guid(),
        timestamp: Date.now(),
        title,
        body,
        author,
        category
    }

    return fetch(postUrl, { method: 'POST' , 
            headers: { 
                'Authorization': 'whatever-you-want',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
}

export function postUpdate(postId, values) {
    const { title, body } = values;
    const putUrl = `${url}/posts/${postId}`
    const data = {
        title,
        body
    }

    return fetch(putUrl, 
        { 
            method: 'PUT' , 
            headers: { 
                'Authorization': 'whatever-you-want',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(data)
        })
        .then(response => response.json())

}