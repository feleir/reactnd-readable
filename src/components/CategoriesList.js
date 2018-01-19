import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { capitalize } from '../utils/helpers'
import { getCategories } from '../actions/categories'

class CategoriesList extends Component {
    componentWillMount() {
        this.props.getCategories();
    }

    render() {
        return (
            <ListGroup>
                <ListGroupItem
                    bsStyle={ !this.props.selectedCategory ? "success" : "info" }
                >
                    <Link to='/'>All</Link>
                </ListGroupItem>
                
                {this.props.categories.map(category => (
                    <ListGroupItem 
                        key={category.name} 
                        bsStyle={ category.name === this.props.selectedCategory ? "success" : "info" }
                    >
                        <Link to={`/${category.path}`} style={{ textDecoration: 'none' }}>
                            {capitalize(category.name)}
                        </Link>
                    </ListGroupItem>
                ))}
            </ListGroup>
        )
    }
}

const mapStatetoProps = ({ categories }) => {
    return {
        categories: categories || [],
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => getCategories(dispatch)
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(CategoriesList);