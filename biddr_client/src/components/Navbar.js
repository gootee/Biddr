import React from "react";
import { NavLink /* Link */ } from "react-router-dom";

import CurrentDateTime from "./CurrentDateTime";

function Navbar(props) {
  const { currentUser, onSignOut } = props;
  const handleSignOutClick = event => {
    event.preventDefault();

    if (typeof onSignOut === "function") {
      onSignOut();
    }
  };
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">
          <NavLink to="/auctions">
            <i className="fas fa-3x fa-gavel"></i>
            <div className="appname">Biddr</div>     
          </NavLink>          
        </div>
        <button className="mini ui button plus-button">
          <NavLink className="reverse-navlink" to="/auctions/new">+ Auction</NavLink>
        </button>
      </div>

      <div className="nav-right">
        {currentUser ? (
          <>
            {/* above 👆 is the react fragment it allows
            returning multiple react elements without a container
          */}

            <span className="user-data">Hi, {currentUser.first_name}</span>
            <a href="#sign_out" className="navlink" onClick={handleSignOutClick}>
              Sign Out
            </a>
          </>
        ) : (
          <>
            <NavLink to="/sign_in" className="navlink">Sign In</NavLink>
            <NavLink to="/sign_up" className="navlink">Sign Up</NavLink>
          </>
        )}
        
        <CurrentDateTime />        
      </div>

    </nav>
  );
}

export default Navbar;