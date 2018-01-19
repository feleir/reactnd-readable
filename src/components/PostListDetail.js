import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroupItem, Badge, Row, Col, Label, Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { TiThumbsUp, TiThumbsDown, TiDelete, TiEdit } from 'react-icons/lib/ti';

import { upVotePost, downVotePost } from '../actions/posts'

class PostListDetail extends Component {
    render() {
        const { post } = this.props
        return (
            <ListGroupItem>
                <ButtonGroup className="pull-right comment-actions">
                    <Button bsStyle="success">
                        <Link to={`/${post.category}/edit/${post.id}`}>
                            <TiEdit />
                        </Link>
                    </Button>
                    <Button bsStyle="danger">
                        <TiDelete />
                    </Button>
                </ButtonGroup>
                <h2>
                    <Link
                        to={`${post.category}/${post.id}`}
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
                            <Button>
                                <TiThumbsDown onClick={() => this.props.downVotePost(post.id)}/>
                            </Button>
                        </Col>
                    </Col>
                </Row>                    
            </ListGroupItem>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        upVotePost: (postId) => upVotePost(postId)(dispatch),
        downVotePost: (postId) => downVotePost(postId)(dispatch),
    }
}

export default connect(null, mapDispatchToProps)(PostListDetail);
