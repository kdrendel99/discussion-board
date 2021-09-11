import React from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types"; 
import ReusableForm from "./ReusableForm";


function NewPostForm(props){

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleNewPostFormSubmission}
        buttonText="Submit" />
    </React.Fragment>
  );
  
  function handleNewPostFormSubmission(event) {
    event.preventDefault();
    props.onNewPostCreation({title: event.target.title.value, body: event.target.body.value, id: v4()});
  }
  // event.target gives us access to the event that was just fired. In this case, we just had a submit event. We can actually grab the values that came from that submit event. 
}

NewPostForm.propTypes = {
  onNewPostCreation: PropTypes.func
};

export default NewPostForm;