import React from 'react'

import { ListGroup, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CommentDetail from './CommentDetail'

const CommentsList = (props) => {
    const { comments } = props

    return (
        <div>
            <Row className="dropdown-row">
                <Button className="pull-left">
                    <Link to='/posts/new' style={{ textDecoration: 'none' }}>Create new comment</Link>
                </Button>
            </Row>
            <Row>
                <ListGroup>
                    {comments.map(comment => (
                        <CommentDetail comment={comment} key={comment.id}/>
                    ))}
                </ListGroup>
            </Row>
        </div>
    )
}

export default CommentsList;
