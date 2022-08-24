import React from "react";
import "./NavMenu.css";
import MenuButton from "../components/MenuButton";
import MenuToggle from "../components/MenuToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlay,
  faBinoculars,
  faTrophy,
  faRankingStar,
  faCommentDots,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const NavMenu = () => {
  const openMenu = () => {};

  return (
    <div className="menu-wrap">
      <div className="menu">
        <li className="toggle">
          <a className="icon-button" href="#">
            <FontAwesomeIcon className="icons" icon={faBars} />
          </a>
        </li>
        <li className="menu-button">
          <a className="icon-button" href="#">
            {" "}
            <FontAwesomeIcon icon={faPlay} />
          </a>
        </li>
        <li className="menu-button">
          <a className="icon-button" href="#">
            {" "}
            <FontAwesomeIcon icon={faBinoculars} />
          </a>
        </li>
        <li className="menu-button">
          <a className="icon-button" href="#">
            {" "}
            <FontAwesomeIcon icon={faUser} />
          </a>
        </li>
        <li className="menu-button">
          <a className="icon-button" href="#">
            {" "}
            <FontAwesomeIcon icon={faTrophy} />
          </a>
        </li>
        <li className="menu-button">
          <a className="icon-button" href="#">
            {" "}
            <FontAwesomeIcon icon={faRankingStar} />
          </a>
        </li>
        <li className="menu-button">
          <a className="icon-button" href="#">
            {" "}
            <FontAwesomeIcon icon={faCommentDots} />
          </a>
        </li>
      </div>
    </div>
  );
};
export default NavMenu;
