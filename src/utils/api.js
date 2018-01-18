const url = 'http://localhost:3001'

export function fetchCategories() {
    return fetch(url + '/categories', { headers: { 'Authorization': 'whatever-you-want' }})
        .then(response => response.json())
}