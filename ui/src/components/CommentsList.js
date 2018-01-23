import React from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import {Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import CommentDetail from './CommentDetail'

import { toolbarStyles } from '../utils/helpers'

const CommentsList = (props) => {
    const { postId, category, comments } = props

    return (
        <div>
            <Toolbar style={toolbarStyles.toolbar}>
                <ToolbarGroup firstChild={true}>
                </ToolbarGroup>
                <ToolbarGroup>
                    <RaisedButton label="Create New Comment" primary={true} href={`/${category}/${postId}/comments/new`}/>
                </ToolbarGroup>
            </Toolbar>
            {comments.map(comment => (
                <CommentDetail comment={comment} category={category} postId={postId} key={comment.id}/>
            ))}
        </div>
    )
}

export default CommentsList;
