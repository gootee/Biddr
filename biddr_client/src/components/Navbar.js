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
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 30px"
      }}
    >
      <NavLink to="/auctions">Auctions</NavLink>
      <NavLink to="/auctions/new">New Auction</NavLink>
      {currentUser ? (
        <>
          {/* above 👆 is the react fragment it allows
          returning multiple react elements without a container
         */}
          <span>Welcome {currentUser.full_name}</span>
          <a href="#sign_out" onClick={handleSignOutClick}>
            Sign Out
          </a>
        </>
      ) : (
        <>
          <NavLink to="/sign_in">Sign In</NavLink>
          <NavLink to="/sign_up">Sign Up</NavLink>
        </>
      )}

      <CurrentDateTime />
    </nav>
  );
}

export default Navbar;