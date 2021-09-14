import React, { useState } from 'react';
import firebase from "firebase/app";
// import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

function Signin(){
  const [signedIn, setSignedIn] = useState(false);

  function doSignIn(event) {
    event.preventDefault();
    // const history = useHistory();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      setSignedIn(true);
      console.log("Successfully signed in!");
    }).catch(function(error) {
      console.log(error.message);
    });
  }
  function doSignOut() {
    firebase.auth().signOut().then(function() {
      setSignedIn(false);
      console.log("Successfully signed out!");
    }).catch(function(error) {
      console.log(error.message);
    });
  }
  return (
    <React.Fragment>
      {signedIn ? <Redirect to="/" /> : null}
      <h1>Sign In</h1>
      <form onSubmit={doSignIn}>
        <input
          type='text'
          name='signinEmail'
          placeholder='email' />
        <input
          type='password'
          name='signinPassword'
          placeholder='Password' />
        <button type='submit'>Sign in</button>
      </form>
      <h1>Sign Out</h1>
      <button onClick={doSignOut}>Sign out</button>
    </React.Fragment>
  );
}

export default Signin