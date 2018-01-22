# Readable Project

This is my implementation of the Readable project for Udacity's React Developer Nanodegree.

Demo: https://readable-react.netlify.com/
Api server has been deployed to: https://radiant-island-11693.herokuapp.com/

## Setup

React front-end can be found in the ui folder

* install all project dependencies with `npm install`
* start the development server with `npm start`

To configure the connection to the backend server just update the .env folder with the appropiate values.

## Components

* Header: Navigation bar
* PostList: Displays a list of posts
* PostDetails: Displays the details of a post and its comments with link to edit/delete post and create new comment
* PostEdit: Form to create/dit a post
* CommentList: Displays a list of comments
* CommentDetail: Displays the details of a comment
* CommendEdit: Form to create/update a comment
* DownvoteButton: Simple button to display the down-vote icon with a tooltip
* UpVotebutton: Simple button to display the up-vote icon with a tooltip.

## Actions

* Categories: Actions related to categories, mainly fetch them
* Comments: Actions related to comments, CRUD operations
* Posts: Actions related to posts, CRUD operations
* Sort: Sorting actions to be able to check how the user selected the sorting order of the posts.

## Reducers:

One reducer per action, the reducers are all asynchronous using redux-thunk

## App Styling

Using https://react-bootstrap.github.io/

## License

This project has been created in accordance with Udacity's honor code, https://udacity.zendesk.com/hc/en-us/articles/210667103-What-is-the-Udacity-Honor-Code-, feel free to check it as help for your own project but never to copy/paste it.