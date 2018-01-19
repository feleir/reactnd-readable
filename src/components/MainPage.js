import React, { Component } from 'react'
import { Grid, Col } from 'react-bootstrap'
import CategoriesList from './CategoriesList'
import PostList from './PostList'

class MainPage extends Component {
    render() {
        return (
            <div>
                <Grid>
                  <Col xs={4} md={4}>
                    <h2>Categories</h2>
                    <CategoriesList selectedCategory={this.props.category} />
                  </Col>
                  <Col xs={8} md={8}>
                    <PostList category={this.props.category} />
                  </Col>
                </Grid>
            </div>
        )
    }   
}

export default MainPage