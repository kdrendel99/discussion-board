import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const DiscussionBoardHeader = styled.h1`
  font-size: 24px;
  text-align: center;
  color: black;
`;

const CenterText = styled.section`
  text-align: center;
`;

function Header(){
  return(
    <React.Fragment>
      <div style={{marginLeft: "30px"}}>
        <DiscussionBoardHeader>
          <h1>Discussion Forum</h1>
        </DiscussionBoardHeader>
        <CenterText>
          <p>A forum to pick your brain.</p>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signin">Sign in</Link>
            </li>
          </ul>
        </CenterText>
      </div>
      <hr/>
    </React.Fragment>
  );
}

export default Header;