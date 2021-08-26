import React from "react";
// import PropTypes from "prop-types";

function NewForumForm(){
  return (
    <React.Fragment>
      <form>
        <input 
          type='text'
          name='name'
          placeholder='New Forum Name'/>
        <input 
          type='text'
          name='description'
          placeholder='Description'/>
        {/* <input 
          type='text'
          name='price'
          placeholder='Price of Forum'/> */}
          <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
}

// NewForumForm.propTypes = {
//   buttonText: PropTypes.string
// };

export default NewForumForm;