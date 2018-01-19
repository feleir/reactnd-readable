import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostDetail from './PostDetail'

import { getPost } from '../actions/posts'

class FullPostDetail extends Component {
    componentWillMount() {
        if (this.props.postId) {
            this.props.getPost(this.props.postId)
        }
    }

    render() {
        return (
            <div className="container">
                {this.props.post && 
                    (
                        <PostDetail post={this.props.post}/>
                    )
                }
            </div>
        )
    }
}

function mapStateToProps({ posts }, ownProps) {
    return { 
        post: posts[ownProps.postId]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPost: (postId) => getPost(postId)(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullPostDetail)