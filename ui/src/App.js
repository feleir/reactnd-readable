import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import PostList from './components/PostList'
import PostEdit from './components/PostEdit'
import CommentEdit from './components/CommentEdit'
import FullPostDetail from './components/FullPostDetail'

import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Switch>
            <Route 
              exact 
              path="/"
              component={PostList}
            />
            <Route 
              exact
              path="/posts/new"  
              component={PostEdit} 
            />
            <Route 
              exact
              path="/:category/:postId/comments/new"  
              render={(props) => 
                {
                  const { match: { params } } = props
                  const { postId }  = params

                  return <CommentEdit parentId={postId} history={props.history}/>
                }
              }
            />
            <Route 
              path="/:category/:postId/comments/edit/:commentId"
              render={(props) => 
                {
                  const { match: { params } } = props
                  const { commentId }  = params

                  return <CommentEdit commentId={commentId} history={props.history}/>
                }
              }
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
              path="/:category"
              render={(props) => 
                {
                  const { match: { params } } = props
                  const category = params.category
                  return <PostList category={category}/>
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
      </div>
    )
  }
}

export default App