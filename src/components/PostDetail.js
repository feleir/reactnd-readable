import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Label, Button, ButtonGroup, Clearfix } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { TiThumbsUp, TiThumbsDown, TiDelete, TiEdit } from 'react-icons/lib/ti';

import { upVotePost, downVotePost, deletePost } from '../actions/posts'

class PostDetail extends Component {
    render() {
        const { post } = this.props
        return (
            <div>
                <ButtonGroup className="pull-left comment-actions">
                    <Button bsStyle={post.voteScore < 0 ? "danger": "success"}>
                        {post.voteScore}
                    </Button>
                    <Button onClick={() => this.props.upVotePost(post.id)}>
                        <TiThumbsUp/>
                    </Button>

                    <Button onClick={() => this.props.downVotePost(post.id)}>
                        <TiThumbsDown />
                    </Button>
                </ButtonGroup>
                <ButtonGroup className="pull-right comment-actions">
                    <Link to={`/${post.category}/edit/${post.id}`} className="btn btn-success">
                        <TiEdit />
                    </Link>
                    <Button bsStyle="danger">
                        <TiDelete onClick={() => this.props.deletePost(post.id)}/>
                    </Button>
                </ButtonGroup>
                <Clearfix />
                <h2>
                    <Link
                        to={`/${post.category}/${post.id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        {post.title}
                    </Link>
                    <br/>
                    <small>Posted by {post.author} on {new Date(post.timestamp).toLocaleString()}</small>
                </h2>
                <p>{post.body}</p>
                <h4><Label bsStyle="primary">{post.category}</Label></h4>
                {post.commentCount ? post.commentCount : 0 } comments
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        upVotePost: (postId) => upVotePost(postId)(dispatch),
        downVotePost: (postId) => downVotePost(postId)(dispatch),
        deletePost: (postId) => deletePost(postId)(dispatch)
    }
}

export default connect(null, mapDispatchToProps)(PostDetail);
