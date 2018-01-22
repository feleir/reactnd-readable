import React from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { TiThumbsDown } from 'react-icons/lib/ti';

const DownvoteButton = (props) => {
    return (
        <OverlayTrigger
			overlay={<Tooltip id={`downvote-${props.id}`}>Down vote</Tooltip>}
			placement="top"
			delayShow={300}
			delayHide={150}
		>
        <Button onClick={() => props.onDownvote()}>
            <TiThumbsDown />
        </Button>
    </OverlayTrigger>
    )
}

export default DownvoteButton