import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ListGroup, ListGroupItem, Row, DropdownButton, MenuItem, Button } from 'react-bootstrap'
import sortBy from 'sort-by'
import PostDetail from './PostDetail'

import { getPosts } from '../actions/posts'
import { sortPostsByKey } from '../actions/sort'
import { Link } from 'react-router-dom';

import { capitalize } from '../utils/helpers'

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
                {this.props.category && (
                    <h2 className='text-center'>{capitalize(this.props.category)}</h2>
                    )
                }
                <Row className="dropdown-row">
                    <Button className="pull-left">
                        <Link to='/posts/new' style={{ textDecoration: 'none' }}>Create new post</Link>
                    </Button>
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
                            <ListGroupItem key={post.id}>
                                <PostDetail post={post} />
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Row>
            </div>
        )
    }
}

const mapStatetoProps = ({ posts, sort }) => {
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