
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroupItem, Row, Col, Label, Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { TiThumbsUp, TiThumbsDown, TiDelete, TiEdit } from 'react-icons/lib/ti';

import { upVoteComment, downVoteComment, deleteComment } from '../actions/comments'

class CommentDetail extends Component {
    render() {
        const { comment } = this.props
        return (
            <ListGroupItem>
                <ButtonGroup className="pull-right comment-actions">
                    <Link to={`/comments/edit/${comment.id}`} className="btn btn-success">
                        <TiEdit />
                    </Link>
                    <Button bsStyle="danger">
                        <TiDelete onClick={() => this.props.deleteComment(comment.id)}/>
                    </Button>
                </ButtonGroup>
                <h2>
                    <small>Posted by {comment.author} on {new Date(comment.timestamp).toLocaleString()}</small>
                </h2>
                <p>{comment.body}</p>
                <Row>
                    <Col md={12} className="text-right">
                        <h3><Label bsStyle={comment.voteScore < 0 ? "danger": "success"}>{comment.voteScore}</Label></h3>
                        <Button onClick={() => this.props.upVoteComment(comment.id)}>
                            <TiThumbsUp />
                        </Button>
                        <Button onClick={() => this.props.downVoteComment(comment.id)}>
                            <TiThumbsDown />
                        </Button>
                    </Col>
                </Row>                    
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
