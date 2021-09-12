import React from "react";
import PropTypes from "prop-types"; 
import ReusableForm from "./ReusableForm";
import { useFirestore } from 'react-redux-firebase'
import { addPost } from "../actions";

function NewPostForm(props){
  const firestore = useFirestore();

  function addPostToFirestore(event) {
    event.preventDefault();

    // We will still need our onNewPostCreation() method to toggle between components - but it will no longer take an argument because it no longer handles creating a Post.
    props.onNewPostCreation();

    // Here's how we will actually add a Post to Firestore.

    return firestore.collection('posts').add(
      {
        title: event.target.title.value,
        body: event.target.body.value, 
        timeOpen: firestore.FieldValue.serverTimestamp()
      }
    );
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={addPostToFirestore}
        buttonText="Submit" />
    </React.Fragment>
  );
  
  // function handleNewPostFormSubmission(event) {
  //   event.preventDefault();
  //   props.onNewPostCreation({
  //     title: event.target.title.value, 
  //     body: event.target.body.value, 
  //     score: 0,
  //     id: v4()});
  // }
  // event.target gives us access to the event that was just fired. In this case, we just had a submit event. We can actually grab the values that came from that submit event. 
}

NewPostForm.propTypes = {
  onNewPostCreation: PropTypes.func
};

export default NewPostForm;