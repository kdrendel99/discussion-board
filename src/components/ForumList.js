import React from 'react';
import Forum from './Forum';
import propTypes from 'prop-types';

function ForumList(props){
  return (
    <React.Fragment>
      <hr/>
      {props.forumData.map((forum) => 
      <Forum
        whenForumClicked = {props.onForumSelection}
        name={forum.name}
        brand={forum.brand}
        // price={forum.price}
        id={forum.id}
        key={forum.id}/>
      )}
    </React.Fragment>
  )
}



ForumList.propTypes = {
  forumData: propTypes.array
};

export default ForumList;