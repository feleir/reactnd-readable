import React from 'react'

import { ListGroup, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CommentDetail from './CommentDetail'

const CommentsList = (props) => {
    const { postId, category, comments } = props

    return (
        <div>
            <Row className="dropdown-row">
                <Link to={`/${category}/${postId}/comments/new`} style={{ textDecoration: 'none' }} className='pull-left'>
                    <Button className="pull-left">
                        Create new comment
                    </Button>
                </Link>
                <Button className='pull-right' bsStyle='primary'>{comments.length} comments</Button>
            </Row>
            <Row>
                <ListGroup>
                    {comments.map(comment => (
                        <CommentDetail comment={comment} category={category} postId={postId} key={comment.id}/>
                    ))}
                </ListGroup>
            </Row>
        </div>
    )
}

export default CommentsList;
