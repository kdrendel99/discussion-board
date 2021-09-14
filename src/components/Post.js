import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { useFirestore } from 'react-redux-firebase';

function Post(props){ 
  const firestore = useFirestore();
  const LeftMarg = styled.section`
  margin-left: 20px;
`;

  function whenVoteClicked(id, currScore, vote){
    const firestorePostScore = {
      score: currScore + vote
    }
    firestore.update({collection: 'posts', doc: id}, firestorePostScore );
  }
  return (
    <React.Fragment>
      <LeftMarg>
        <div onClick = {() => props.whenPostClicked(props.id)}>
          <h1>{props.title} - Score: {props.score}</h1>
          <h3>{props.body}</h3>
          {/* <h4>Score: {props.score}</h4> */}
        </div>
        <button onClick = {() => whenVoteClicked(props.id, props.score, 1)}>Upvote</button>
        <button onClick = {() => whenVoteClicked(props.id, props.score, -1)}>Downvote</button>
        {/* <button onClick = {() => props.whenVoteClicked(props.id, 1)}>Upvote in Post</button>  */}
        {/* <button onClick = {() => props.whenVoteClicked(props.id, -1)}>Down vote in post</button>  */}
      </LeftMarg>
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
