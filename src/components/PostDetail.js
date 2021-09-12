import React from "react";
import PropTypes from "prop-types";

function PostDetail(props){
  const { post, onClickingDelete } = props; //new code

  return (
    <React.Fragment>
      <h1>Post Detail</h1>
      <h3>{post.title}</h3>
      <p><em>{post.body}</em></p>
      <h4>{post.score}</h4>
      <button onClick={ props.onClickingEdit }>Update Post</button>
      <button onClick={()=> onClickingDelete(post.id) }>Delete Post</button> { /* new code */ }
      <hr/>
    </React.Fragment>
  );
}

PostDetail.propTypes = {
  post: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default PostDetail;