import React from "react";
import Post from "./Post";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'


function PostList(props){
  useFirestoreConnect([
    { collection: 'posts' }
  ]);

  const posts = useSelector(state => state.firestore.ordered.posts);

  if (isLoaded(posts)) {
    return (
      <React.Fragment>
        <hr/>
        {posts.map((post) => {
          return <Post
            whenPostClicked = { props.onPostSelection }
            title={post.title}
            body={post.body}
            score={post.score}
            formattedWaitTime={post.formattedWaitTime}
            id={post.id}
            key={post.id}/>
        })}
      </React.Fragment>
    );
  // If the posts aren't loaded yet, our fragment will return a "Loading..." message.
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}
//
PostList.propTypes = {
  onPostSelection: PropTypes.func
};

export default PostList;