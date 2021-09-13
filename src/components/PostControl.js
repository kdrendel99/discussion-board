import React from 'react';
import NewPostForm from './NewPostForm';
import PostList from './PostList';
import PostDetail from './PostDetail';
import EditPostForm from './EditPostForm';
import PropTypes from "prop-types";
import * as a from './../actions';
import { connect } from 'react-redux';
import { withFirestore, isLoaded } from 'react-redux-firebase';



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

//Top handleVoteClick works, but is it the right way to do it?
  handleVoteClick = (id, currScore, vote) => {
      const firestorePostScore = {
        score: currScore + vote
      }
      this.props.firestore.update({collection: 'posts', doc: id}, firestorePostScore );
  }
//This one also works, but everything besides the post that the button was clicked in stops rendering.
  // handleVoteClick = (id, vote) => {
  //   this.props.firestore.get({collection: 'posts', doc: id}).then((post) => {
  //     const firestorePostScore = {
  //       score: post.get("score") + vote
  //       // id: post.id
  //     }
  //     // console.log(firestorePostScore.score);
  //     this.props.firestore.update({collection: 'posts', doc: id}, firestorePostScore );
  //   })
  // }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    const auth = this.props.firebase.auth();
    if (!isLoaded(auth)) {
      return (
        <React.Fragment>
          <h1>Loading...</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser == null)) {
      return (
        <React.Fragment>
          <h1>You must be signed in to access the discussion board.</h1>
        </React.Fragment>
      )
    } 
    if ((isLoaded(auth)) && (auth.currentUser != null)){
  
      if (this.state.editing) {      
        currentlyVisibleState = <EditPostForm post = {this.state.selectedPost} onEditPost = {this.handleEditingPostInList} />
        buttonText = "Return to Post List";
      } else if (this.state.selectedPost != null) {
        currentlyVisibleState = <PostDetail post={this.state.selectedPost} onClickingDelete={this.handleDeletingPost} onClickingEdit={this.handleEditClick} />
        buttonText = "Return to Post List";
      }
      else if (this.props.formVisibleOnPage) {
        currentlyVisibleState = <NewPostForm onNewPostCreation={this.handleAddingNewPostToList} />;
        buttonText = "Return to Post List";
      } else {
        currentlyVisibleState = (<PostList onPostSelection={this.handleChangingSelectedPost} onVoteClick={this.handleVoteClick}/>);
        // Because a user will actually be clicking on the Post in the Post component, we will need to pass our new handleChangingSelectedPost method as a prop.
        buttonText = "Add Post";
      }
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
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    formVisibleOnPage: state.formVisibleOnPage
  }
}

// Note: we are now passing mapStateToProps into the connect() function.

PostControl = connect(mapStateToProps)(PostControl);

export default withFirestore(PostControl);