import React from "react";
// import PropTypes from "prop-types";

function NewForumPost(props){
  return (
    <React.Fragment>
      <input 
        type='text'
        name='name'
        placeholder='What would you like to post in this forum?'/>
      <button onClick ={() => props.whenNewForumPostClicked(props.id)}>Submit</button>
    </React.Fragment>
  );
}

// NewForumForm.propTypes = {
//   buttonText: PropTypes.string
// };

export default NewForumForm;