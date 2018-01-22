import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostDetail from './PostDetail'
import CommentsList from './CommentsList'

import { getPost } from '../actions/posts'
import { getPostComments } from '../actions/comments'
import sortBy from 'sort-by'
class FullPostDetail extends Component {
    componentWillMount() {
        const { postId } = this.props
        if (postId) {
            this.props.getPost(postId)
            this.props.getPostComments(postId)
        }
    }

    render() {
        const comments = (this.props.comments || []).sort(sortBy('-timestamp'))

        return (
            <div className="container">
                {this.props.post && 
                    (
                        <PostDetail post={this.props.post}/>
                    )
                }
                {this.props.comments && 
                 this.props.post &&
                    (
                        <CommentsList comments={comments} postId={this.props.post.id} category={this.props.post.category} />
                    )
                }
            </div>
        )
    }
}

function mapStateToProps({ posts, comments }, ownProps) {
    const { postId } = ownProps
    return { 
        post: posts[postId],
        comments: Object.values(comments).filter(comment => comment.parentId === postId)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPost: (postId) => getPost(postId)(dispatch),
        getPostComments : (postId) => getPostComments(postId)(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullPostDetail)