import React from "react";
import Header from "./Header";
import PostControl from './PostControl';
import Signin from "./Signin";
import Signup from "./Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(){
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path ="/">
          <PostControl />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;