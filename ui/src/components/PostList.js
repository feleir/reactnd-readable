import React, { Component } from 'react'
import { connect } from 'react-redux'

import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'
import PostDetail from './PostDetail'

import { bindActionCreators } from 'redux'
import { getPosts, deletePost } from '../actions/posts'
import { sortPostsByKey, sortByOptions, SORT_BY_DESCENDING } from '../actions/sort'

import sortBy from 'sort-by'
import { capitalize } from '../utils/helpers'
import { toolbarStyles } from '../utils/helpers'

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
        const { key, order } = selectedSortBy
        const posts = this.props.posts.sort(sortBy(`${order === SORT_BY_DESCENDING ? '-' : ''}${key}`))

        return (
            <div>
                <Toolbar style={toolbarStyles.toolbar}>
                    <ToolbarGroup firstChild={true}>
                        <DropDownMenu value={this.props.sortedBy || 0} onChange={ (event, index, value) => this.selectedSortByChanged(value) }>
                            {sortByOptions.map((option, index) => (
                                <MenuItem key={index} value={index} primaryText={option.description} />
                            ))}
                        </DropDownMenu>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <ToolbarTitle text={this.props.category && capitalize(this.props.category)} />
                        <RaisedButton label="Create New Post" primary={true} href='/posts/new'/>
                    </ToolbarGroup>
                </Toolbar>
                {posts.map(post => (
                        <PostDetail key={post.id} post={post} onDelete={(postId) => this.props.deletePost(postId) }/>
                ))}
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
const mapDispatchToProps = (dispatch) => bindActionCreators({ getPosts, deletePost, sortPostsByKey }, dispatch)

export default connect(mapStatetoProps, mapDispatchToProps)(PostList);
