import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Col, Navbar } from 'react-bootstrap'
import MainPage from './components/MainPage'
import CategoriesList from './components/CategoriesList'

import { getCategories } from './actions'

class App extends Component {
  componentDidMount() {
    this.props.getCategories()
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Udacity React's Nanodegree Readable</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Col xs={4} md={4}>
            <CategoriesList />
          </Col>
          <Col xs={8} md={8}>
            <Route 
              exact 
              path="/"
              component={MainPage}
            />
          </Col>
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => getCategories(dispatch)
  }
}
export default connect(null, mapDispatchToProps)(App);
