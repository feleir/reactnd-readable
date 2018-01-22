
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroupItem, Button, ButtonGroup, Clearfix } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { TiThumbsUp, TiThumbsDown, TiDelete, TiEdit } from 'react-icons/lib/ti';

import { upVoteComment, downVoteComment, deleteComment } from '../actions/comments'

class CommentDetail extends Component {
    render() {
        const { comment, category, postId } = this.props
        return (
            <ListGroupItem>
                <ButtonGroup className="pull-left comment-actions">
                    <Button bsStyle={comment.voteScore < 0 ? "danger": "success"}>
                        {comment.voteScore}
                    </Button>
                    <Button onClick={() => this.props.upVoteComment(comment.id)}>
                        <TiThumbsUp />
                    </Button>
                    <Button onClick={() => this.props.downVoteComment(comment.id)}>
                        <TiThumbsDown />
                    </Button>
                </ButtonGroup>
                <ButtonGroup className="pull-right comment-actions">
                    <Link to={`/${category}/${postId}/comments/edit/${comment.id}`} className="btn btn-success">
                        <TiEdit />
                    </Link>
                    <Button bsStyle="danger">
                        <TiDelete onClick={() => this.props.deleteComment(comment.id)}/>
                    </Button>
                </ButtonGroup>
                <Clearfix />
                <h2>
                    <small>Posted by {comment.author} on {new Date(comment.timestamp).toLocaleString()}</small>
                </h2>
                <p>{comment.body}</p>         
            </ListGroupItem>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        upVoteComment: (commentId) => upVoteComment(commentId)(dispatch),
        downVoteComment: (commentId) => downVoteComment(commentId)(dispatch),
        deleteComment: (commentId) => deleteComment(commentId)(dispatch)
    }
}

export default connect(null, mapDispatchToProps)(CommentDetail);
