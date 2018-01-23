
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroupItem, Button, ButtonGroup, Clearfix } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UpVoteButton from './UpVoteButton'
import Downvotebutton from './Downvotebutton'

import { TiDelete, TiEdit } from 'react-icons/lib/ti';

import { bindActionCreators } from 'redux'
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
                    <UpVoteButton onUpvote={() => this.props.upVoteComment(comment.id)} id={comment.id}/>
                    <Downvotebutton onDownvote={() => this.props.downVoteComment(comment.id)} id={comment.id}/>
                </ButtonGroup>
                <ButtonGroup className="pull-right comment-actions">
                    <Link to={`/${category}/${postId}/comments/edit/${comment.id}`} className="btn btn-success">
                        <TiEdit />
                    </Link>
                    <Button bsStyle="danger" onClick={() => this.props.deleteComment(comment.id)}>
                        <TiDelete />
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ upVoteComment, downVoteComment, deleteComment, dispatch})

export default connect(null, mapDispatchToProps)(CommentDetail);
