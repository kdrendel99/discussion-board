import React from 'react';
import { Link } from "react-router-dom";

function Header(){
  return(
    <React.Fragment>
      <div style={{marginLeft: "30px"}}>
        <h1>Discussion Forum</h1>
        <p>A discussion forum application</p>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
        </ul>
      </div>
      <hr/>
    </React.Fragment>
  );
}

export default Header;