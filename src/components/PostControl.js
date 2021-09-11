import React from 'react';
import NewPostForm from './NewPostForm';
import PostList from './PostList';
import PostDetail from './PostDetail';
import EditPostForm from './EditPostForm';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

class PostControl extends React.Component{
  constructor(props) {
    super(props);
    console.log(props);
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
      const action = {
        type: 'TOGGLE_FORM'
      }
      dispatch(action);
    }
  }

  handleAddingNewPostToList = (newPost) => {
    const { dispatch } = this.props;
    const { id, title, body } = newPost;
    const action = {
      type: 'ADD_POST',
      id: id,
      title: title,
      body: body,
    }
    dispatch(action);
    const action2 = {
      type: 'TOGGLE_FORM'
    }
    dispatch(action2);
  }

  handleChangingSelectedPost = (id) => {
    const selectedPost = this.props.masterPostList[id];
    this.setState({selectedPost: selectedPost});
  }

  handleDeletingPost = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_POST',
      id: id
    }
    dispatch(action);
    this.setState({selectedPost: null});
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing:true});
  }

  handleEditingPostInList = (postToEdit) => {
    const { dispatch } = this.props;
    const { id, title, body } = postToEdit;
    const action = {
      type: 'ADD_POST',
      id: id,
      title: title,
      body: body,
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedPost: null
    });
  }


  // handleBuy = (id) => {
  // const postToEdit = this.state.postData.filter(post => post.id === id)[0];

  // // if (postToEdit.remainingPints === 0) {
  // //   return;
  // // }

  //   const editedPost = {...postToEdit, 
  //     // remainingPints: postToEdit.remainingPints - 1
  //   };

  //   // const PostToAddToCart = {...editedPost};
  //   // const editedCartList = this.state.cartList.concat(PostToAddToCart);
  //   // // <Cart cartList = {this.state.cartList}/>
  //   // console.log(editedCartList);
  //   const editedPostData = this.state.postData
  //     .map(currentPost => {
  //       if (currentPost.id === editedPost.id) {
  //         return editedPost;
  //       }
  //       else {
  //         return currentPost;
  //       }
  //     });
  //   this.setState({
  //     postData: editedPostData,
  //     // cartList: editedCartList,
  //     selectedPost: null,
  //     editing: false
  //   });
  // }
  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing ) {      
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
      currentlyVisibleState = <PostList postList={this.props.masterPostList} onPostSelection={this.handleChangingSelectedPost} />;
      // Because a user will actually be clicking on the Post in the Post component, we will need to pass our new handleChangingSelectedPost method as a prop.
      buttonText = "Add Post";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> { /* new code */}
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

export default PostControl;