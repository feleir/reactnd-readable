
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up'
import ThumbDownIcon from 'material-ui/svg-icons/action/thumb-down'
import {red500, green200} from 'material-ui/styles/colors'

import { bindActionCreators } from 'redux'
import { upVoteComment, downVoteComment, deleteComment } from '../actions/comments'

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    firstIcon: {
        marginLeft: 'auto'
    }
}

class CommentDetail extends Component {
    render() {
        const { comment, category, postId } = this.props
        const { id } = comment
        return (
            <Card>
                    <CardTitle
                        subtitle={`Posted by ${comment.author} on ${new Date(comment.timestamp).toLocaleString()}`}
                    />
                    <CardText>
                            {comment.body}
                    </CardText>
                    <CardActions>
                        <div style={styles.wrapper}>
                            <Chip
                                style={styles.chip} 
                                backgroundColor={comment.voteScore < 0 ? red500 : green200}
                            >
                                <Avatar icon={<ThumbUpIcon />} />
                                {comment.voteScore}
                            </Chip>
                            <FlatButton label="Edit" href={`/${category}/${postId}/comments/edit/${id}`} icon={<EditIcon />} style={styles.firstIcon}/>
                            <FlatButton label="Delete" onClick={() => this.props.deleteComment(id)} icon={<DeleteIcon /> } />
                            <FlatButton label="Like" onClick={() => this.props.upVoteComment(id)} icon={<ThumbUpIcon /> } />
                            <FlatButton label="Dislike" onClick={() => this.props.downVoteComment(id)} icon={<ThumbDownIcon /> } />
                        </div>
                    </CardActions>
            </Card>
        )
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ upVoteComment, downVoteComment, deleteComment}, dispatch)

export default connect(null, mapDispatchToProps)(CommentDetail);
