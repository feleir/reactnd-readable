import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostDetail from './PostDetail'
import CommentsList from './CommentsList'
import NotFound from './NotFound'

import sortBy from 'sort-by'

import { bindActionCreators } from 'redux'
import { getPost, deletePost } from '../actions/posts'
import { getPostComments } from '../actions/comments'

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
                {this.props.post == null && <NotFound type='post'/>}
                {this.props.post && 
                    (
                        <PostDetail post={this.props.post} onDelete={
                            (postId) => 
                            {
                                this.props.deletePost(postId)
                                this.props.history.goBack()
                            }
                         } />
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ getPost, deletePost, getPostComments }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FullPostDetail)