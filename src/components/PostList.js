import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ListGroup, Row, DropdownButton, MenuItem } from 'react-bootstrap'
import sortBy from 'sort-by'
import PostListDetail from './PostListDetail'
import { getPosts } from '../actions/posts'
import { sortPostsByKey } from '../actions/sort'

const sortByOptions = [
    { key: 'timestamp', description: "By Date" },
    { key: 'voteScore', description: "By score" }
]

class PostList extends Component {
    componentWillMount() {
        this.props.getPosts(this.props.category)
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.category !== nextProps.category) {
            this.props.getPosts(nextProps.category)
        }
    }

    selectedSortByChanged(newValue) {
        this.props.sortPostsByKey(newValue)
    }

    
    render() {
        const selectedSortBy = this.props.sortedBy || 0;
        const selectedSortDescription = sortByOptions[selectedSortBy].description;
        const posts = this.props.posts.sort(sortBy(sortByOptions[selectedSortBy].key)).reverse()

        return (
            <div>
                <Row className="dropdown-row">
                    <DropdownButton
                        title={selectedSortDescription}
                        id="sort-posts"
                    >
                        {sortByOptions.map((option, index) => (
                            <MenuItem eventKey={index} key={index} onSelect={value => this.selectedSortByChanged(value)}>
                                {option.description}
                            </MenuItem>
                        ))}
                    </DropdownButton>
                </Row>
                <Row>
                    <ListGroup>
                        {posts.map(post => (
                            <PostListDetail post={post} key={post.id} />
                        ))}
                    </ListGroup>
                </Row>
            </div>
        )
    }
}

const mapStatetoProps = ({ posts, sort }) => {
    console.log(posts)
    return {
        posts: Object.values(posts),
        sortedBy: sort['posts']
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: (category) => getPosts(category)(dispatch),
        sortPostsByKey: (key) => dispatch(sortPostsByKey(key))
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(PostList);
