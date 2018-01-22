import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ListGroup, ListGroupItem, Row, DropdownButton, MenuItem, Button } from 'react-bootstrap'
import sortBy from 'sort-by'
import PostDetail from './PostDetail'

import { getPosts } from '../actions/posts'
import { sortPostsByKey, sortByOptions, SORT_BY_DESCENDING } from '../actions/sort'
import { Link } from 'react-router-dom';

import { capitalize } from '../utils/helpers'

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
        const selectedSortBy = sortByOptions[this.props.sortedBy || 0];
        const { key, description, order } = selectedSortBy
        const posts = this.props.posts.sort(sortBy(`${order === SORT_BY_DESCENDING ? '-' : ''}${key}`))

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
                        title={description}
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
