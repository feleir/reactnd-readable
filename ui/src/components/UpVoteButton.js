import React from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { TiThumbsUp } from 'react-icons/lib/ti';

const UpVoteButton = (props) => {
    return (
        <OverlayTrigger
			overlay={<Tooltip id={`upvote-${props.id}`}>Up vote</Tooltip>}
			placement="top"
			delayShow={300}
			delayHide={150}
		>
            <Button onClick={() => props.onUpvote()}>
                <TiThumbsUp />
            </Button>
        </OverlayTrigger>
    )
}

export default UpVoteButton