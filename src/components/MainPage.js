import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import CategoriesList from './CategoriesList'
import PostList from './PostList'

class MainPage extends Component {
    render() {
        return (
            <div className="container">
                <Col xs={4} md={4}>
                <h2>Categories</h2>
                <CategoriesList selectedCategory={this.props.category} />
                </Col>
                <Col xs={8} md={8}>
                <PostList category={this.props.category} />
                </Col>
            </div>
        )
    }   
}

export default MainPage