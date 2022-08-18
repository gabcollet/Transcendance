import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <div className="topbanner-wrapper">
      <div className="user-icon-wrapper">
        <FontAwesomeIcon className="user-icon" icon={faUser} />
      </div>
      <div className="topbanner-filler"></div>
      <div className="topbanner-bar"></div>
    </div>
  );
};

export default NavBar;
