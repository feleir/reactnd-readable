import React from 'react';

const NotFound = (props) =>
  <div className="container">
    <h3>This is not the {props.type} you are looking for.</h3>
    <a href="/">Go to main page</a>
  </div>

export default NotFound;