import React from "react";
import PropTypes from "prop-types";

function Post(props){ 
  return (
    <React.Fragment>
      <div onClick = {() => props.whenPostClicked(props.id)}>
      <h1>{props.title}</h1>
      <h3>{props.body}</h3>
      <hr/>
      </div>
    </React.Fragment>
  );
}

Post.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  id: PropTypes.string,
  whenPostClicked: PropTypes.func
}; 

export default Post;
