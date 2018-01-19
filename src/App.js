import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import MainPage from './components/MainPage'
import PostEdit from './components/PostEdit'
import FullPostDetail from './components/FullPostDetail'

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
            path="/:category/edit/:postId"
            render={(props) => 
              {
                const { match: { params } } = props
                const { postId }  = params

                return <PostEdit postId={postId} history={props.history}/>
              }
            }
          />
          <Route 
            exact
            path="/posts/new"  
            component={PostEdit} 
          />
          <Route 
            exact
            path="/:category"
            render={(props) => 
              {
                const { match: { params } } = props
                const category = params.category
                return <MainPage category={category}/>
              }
            }
          />
          <Route 
            exact
            path="/:category/:postId" 
            render={(props) => {
              const { match: { params } } = props
              const { postId }  = params
              
              return <FullPostDetail postId={postId} history={props.history}/>
            }}
          />
        </Switch>
      </div>
    )
  }
}

export default App