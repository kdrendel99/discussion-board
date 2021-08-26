import React from 'react';
import PropTypes from 'prop-types';

function Forum(props){
  return(
    <React.Fragment>
      <div onClick ={() => props.whenForumClicked(props.id)}>
        <h3>{props.name}</h3>
        <h4>{props.description}</h4>
        {/* <p>{props.price}</p> */}
        <hr/>
        </div>
    </React.Fragment>
  )
}

Forum.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  // price: PropTypes.number.isRequired,
}

export default Forum;