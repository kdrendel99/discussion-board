import React from "react";
import Header from "./Header";
import PostControl from './PostControl';
import Signin from "./Signin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Post from "./Post";

function App(){
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path ="/">
          <PostControl />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;