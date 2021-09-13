import React from 'react';
import ReusableForm from './ReusableForm';
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase';

function EditPostForm(props){
  const { post } = props;
  const firestore = useFirestore();

  function handleEditPostFormSubmission(event) {
    event.preventDefault();
    props.onEditPost();
    const propertiesToUpdate = {
      title: event.target.title.value,
      body: event.target.body.value, 
    }
    return firestore.update({collection: 'posts', doc: post.id }, propertiesToUpdate)
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleEditPostFormSubmission} /* new code */ 
        buttonText="Update Post" />
    </React.Fragment>
  );
}

EditPostForm.propTypes = {
  post: PropTypes.object,
  onEditPost: PropTypes.func
};

export default EditPostForm;