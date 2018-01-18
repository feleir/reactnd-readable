import React from 'react'
import { connect } from 'react-redux'

import { ListGroup, ListGroupItem } from 'react-bootstrap'

const CategoriesList = (props) => {
    return (
        <ListGroup>
            {props.categories.map(category => (
                <ListGroupItem key={category.name}>
                    {category.name}
                </ListGroupItem>
            ))}
        </ListGroup>
    )
}


const mapStatetoProps = ({ categories }) => {
    console.log({
        categories: categories.categories || []
    })
    return {
        categories: categories.categories || []
    }
}

export default connect(mapStatetoProps)(CategoriesList);