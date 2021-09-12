import React from "react";
import Post from "./Post";
import PropTypes from "prop-types";

function PostList(props){
  return (
    <React.Fragment>
      <hr/>
      {/* We now need to map over the values of an object, not an array. */}
      {Object.values(props.postList).map((post) =>
        <Post
          whenPostClicked = { props.onPostSelection }
          onVoteClick = {props.onVoteClick}
          title={post.title}
          body={post.body}
          score={post.score}
          formattedWaitTime={post.formattedWaitTime}
          id={post.id}
          key={post.id}/>
      )}
    </React.Fragment>
  );
}
//
PostList.propTypes = {
  postList: PropTypes.object,
  onPostSelection: PropTypes.func
};

export default PostList;