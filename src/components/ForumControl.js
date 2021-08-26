import React from 'react';
import ForumData from './../data/ForumData';
import NewForumForm from './NewForumForm';
import ForumList from './ForumList';
import ForumDetail from './ForumDetail';

class ForumControl extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      formVisibleOnPage: false,
      forumData: ForumData,
      selectedForum: null,
      forumDetailsVisibleOnPage: false
    };
  }

  handleClick = () => {
    if (this.state.selectedForum != null){
      this.setState({
        formVisibleOnPage: false,
        selectedForum: null,
        forumDetailsVisibleOnPage: false,
      });
    }
    else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }

  handleChangingSelectedForum = (id) => {
    const selectedForum = this.state.forumData.filter(forum => forum.id === id)[0];
    this.setState({
      selectedForum: selectedForum,
    });
  }

  handleAddingNewForumToData = (newForum) => {
    const newForumList = this.state.forumData.concat(newForum);
    this.setState({forumData: newForumList, formVisibleOnPage: false})
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.selectedForum != null){
      currentlyVisibleState = <ForumDetail forum = {this.state.selectedForum} />
      buttonText = "Return to forum list";
    }
    else if (this.state.formVisibleOnPage){
      currentlyVisibleState = <NewForumForm onNewForumCreation = {this.handleAddingNewForumToData}/>
      buttonText = "Return to Forum list";
    }
    else{
      currentlyVisibleState = <ForumList 
      //Passing all the data
        forumData = {this.state.forumData} 
      //Replaces the 'old' forum with the new edited one with the new decremented remaining pints value
        // onClickingBuy = {this.handleBuy}
        onForumSelection = {this.handleChangingSelectedForum}/>;
        buttonText = "Add Forum";
    }

    return(
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick} style={{marginLeft: "30px"}}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default ForumControl;