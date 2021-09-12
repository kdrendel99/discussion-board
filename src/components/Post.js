import React from "react";
import PropTypes from "prop-types";

function Post(props){ 
  return (
    <React.Fragment>
      <div onClick = {() => props.whenPostClicked(props.id)}>
        <h1>{props.title}</h1>
        <h3>{props.body}</h3>
        <h4>{props.score}</h4>
      </div>
      <button onClick = {() => props.onVoteClick(props.id, 1)}>Upvote</button> 
      <button onClick = {() => props.onVoteClick(props.id, -1)}>Down vote</button> 
      <hr/>

    </React.Fragment>
  );
}

Post.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  score: PropTypes.number,
  id: PropTypes.string,
  whenPostClicked: PropTypes.func
}; 

export default Post;
