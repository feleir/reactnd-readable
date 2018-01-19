import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import MainPage from './components/MainPage'

import './App.css'

class App extends Component {
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
        <Switch>
          <Route 
                exact 
                path="/"
                component={MainPage}
              />
          <Route 
            path="/:category"
            render={(props) => 
              {
                const { match: { params } } = props
                const category = params.category
                return <MainPage category={category}/>
              }
            }
          />
        </Switch>
      </div>
    )
  }
}

export default App