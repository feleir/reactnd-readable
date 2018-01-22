import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Badge, Row, Col, Label, Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { TiThumbsUp, TiThumbsDown, TiDelete, TiEdit } from 'react-icons/lib/ti';

import { upVotePost, downVotePost, deletePost } from '../actions/posts'

class PostDetail extends Component {
    render() {
        const { post } = this.props
        return (
            <div>
                <ButtonGroup className="pull-right comment-actions">
                    <Link to={`/${post.category}/edit/${post.id}`} className="btn btn-success">
                        <TiEdit />
                    </Link>
                    <Button bsStyle="danger">
                        <TiDelete onClick={() => this.props.deletePost(post.id)}/>
                    </Button>
                </ButtonGroup>
                <h2>
                    <Link
                        to={`/${post.category}/${post.id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        {post.title}
                    </Link>
                    <br/>
                    <small>Posted by {post.author}</small>
                </h2>
                <p>{post.body}</p>
                <Row>
                    <Col md={12}>
                        <Col md={8} className="text-left">
                            <Badge>{new Date(post.timestamp).toLocaleString()}</Badge>
                            <h4><Label bsStyle="primary">{post.category}</Label></h4>
                            {post.commentCount ? post.commentCount : 0 } comments
                        </Col>
                        <Col md={4} className="text-right">
                            <h3><Label bsStyle={post.voteScore < 0 ? "danger": "success"}>{post.voteScore}</Label></h3>
                            <Button onClick={() => this.props.upVotePost(post.id)}>
                                <TiThumbsUp/>
                            </Button>
                            <Button onClick={() => this.props.downVotePost(post.id)}>
                                <TiThumbsDown />
                            </Button>
                        </Col>
                    </Col>
                </Row>                    
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
