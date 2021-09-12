import React from 'react';
import ReusableForm from './ReusableForm';
import PropTypes from "prop-types";

function EditPostForm(props){
  const { post } = props;

  function handleEditPostFormSubmission(event) {
    event.preventDefault();
    props.onEditPost({
      title: event.target.title.value, 
      body: event.target.body.value, 
      score: post.score,
      id: post.id});
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