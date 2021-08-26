import React from "react";
import PropTypes from "prop-types";

function ForumDetail(props){

  const { forum } = props;

  return(
    <React.Fragment>
      <h1>{`${forum.name} Details`}</h1>
      <h3>{`${forum.description}`}</h3>
      {/* <h3>${forum.price} per forum</h3> */}
      <hr/>
    </React.Fragment>
  )
}


ForumDetail.propTypes = {
  forum: PropTypes.object,
}

export default ForumDetail;