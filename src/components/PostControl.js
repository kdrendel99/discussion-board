import React from 'react';
import NewPostForm from './NewPostForm';
import PostList from './PostList';
import PostDetail from './PostDetail';
import EditPostForm from './EditPostForm';
import PropTypes from "prop-types";
import * as a from './../actions';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase'


class PostControl extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedPost: null,
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedPost != null) {
      this.setState({
        selectedPost: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleAddingNewPostToList = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }

  handleChangingSelectedPost = (id) => {
    this.props.firestore.get({collection: 'posts', doc: id}).then((post) => {
      const firestorePost = {
        title: post.get("title"),
        body: post.get("body"),
        score: post.get("score"),
        id: post.id
      }
      this.setState({selectedPost: firestorePost});
    })
  }

  handleDeletingPost = (id) => {
    this.props.firestore.delete({collection: 'posts', doc: id});
    this.setState({selectedPost: null});
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing:true});
  }

  handleEditingPostInList = (postToEdit) => {
    this.setState({
      editing: false,
      selectedPost: null
    });
  }

  handleVoteClick = (id, vote) => {
    const { dispatch } = this.props;
    const action = a.updateScore(id, vote);
    dispatch(action);
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {      
      currentlyVisibleState = <EditPostForm post = {this.state.selectedPost} onEditPost = {this.handleEditingPostInList} />
      buttonText = "Return to Post List";
    } else if (this.state.selectedPost != null) {
      currentlyVisibleState = <PostDetail post={this.state.selectedPost} onClickingDelete={this.handleDeletingPost} onClickingEdit={this.handleEditClick} />
      buttonText = "Return to Post List";
      // While our PostDetail component only takes placeholder data, we will eventually be passing the value of selectedPost as a prop.
    }
    else if (this.props.formVisibleOnPage) {
      // This conditional needs to be updated to "else if."
      currentlyVisibleState = <NewPostForm onNewPostCreation={this.handleAddingNewPostToList} />;
      buttonText = "Return to Post List";
    } else {
      currentlyVisibleState = (<PostList postList={this.props.masterPostList} onPostSelection={this.handleChangingSelectedPost} onVoteClick={this.handleVoteClick}/>);
      // Because a user will actually be clicking on the Post in the Post component, we will need to pass our new handleChangingSelectedPost method as a prop.
      buttonText = "Add Post";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> 
      </React.Fragment>
    );
  }
}

PostControl.propTypes = {
  masterPostList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    masterPostList: state.masterPostList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

// Note: we are now passing mapStateToProps into the connect() function.

PostControl = connect(mapStateToProps)(PostControl);

export default withFirestore(PostControl);