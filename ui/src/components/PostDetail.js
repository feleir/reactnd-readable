import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { upVotePost, downVotePost } from '../actions/posts'

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import CommentIcon from 'material-ui/svg-icons/communication/comment'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up'
import ThumbDownIcon from 'material-ui/svg-icons/action/thumb-down'
import {red500, green200} from 'material-ui/styles/colors'

import { toolbarStyles } from '../utils/helpers'

class PostDetail extends Component {
    render() {
        const { post } = this.props
        return (
            <Card>
                <CardTitle 
                    title={
                        <Link
                            to={`/${post.category}/${post.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            {post.title}
                        </Link>
                    } 
                    subtitle={`Posted by ${post.author} on ${new Date(post.timestamp).toLocaleString()}`}
                />
                <CardText>
                    {post.body}
                </CardText>
                <CardActions>
                    <div style={toolbarStyles.wrapper}>
                        <Chip
                            style={toolbarStyles.chip}
                        >
                            {post.category}
                        </Chip>
                        <Chip
                            style={toolbarStyles.chip}
                        >
                            <Avatar icon={<CommentIcon />} />
                            {post.commentCount ? post.commentCount : 0 }
                        </Chip>
                        <Chip
                            style={toolbarStyles.chip} 
                            backgroundColor={post.voteScore < 0 ? red500 : green200}
                        >
                            <Avatar icon={<ThumbUpIcon />} />
                            {post.voteScore}
                        </Chip>
                        <FlatButton label="Edit" href={`/${post.category}/edit/${post.id}`} icon={<EditIcon />} style={toolbarStyles.firstIcon}/>
                        <FlatButton label="Delete" onClick={() => this.props.onDelete(post.id)} icon={<DeleteIcon /> } />
                        <FlatButton label="Like" onClick={() => this.props.upVotePost(post.id)} icon={<ThumbUpIcon /> } />
                        <FlatButton label="Dislike" onClick={() => this.props.downVotePost(post.id)} icon={<ThumbDownIcon /> } />
                    </div>
                </CardActions>
            </Card>
        )
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ upVotePost, downVotePost }, dispatch)

export default connect(null, mapDispatchToProps)(PostDetail);
