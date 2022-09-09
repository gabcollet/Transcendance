import {
  faCommentDots,
  faPlayCircle,
  faTrophy,
  faRankingStar,
  faUser,
  faBinoculars,
  faBars,
  faX,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import Toggle from "./Toggle";
import _Toggle from "./Toggle";
import MenuButton from "./MenuButton";
import React, { MouseEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import "./MenuWheel.css";

interface _MenuWheel {}

const MenuWheel = (props: _MenuWheel) => {
  const [toggleName, setToggleName] = useState("toggle");
  const [opening, setOpening] = useState(false);
  const [iconName, setIconName] = useState("");
  const [toggleIcon, setToggleicon] = useState(faBars);

  const openMenu: MouseEventHandler<HTMLDivElement> = () => {
    if (opening === false) {
      setOpening(true);
      setToggleicon(faX);
      setIconName("-t");
      setToggleName("toggle-open");
    } else {
      setOpening(false);
      setToggleicon(faBars);
      setIconName("");
      setToggleName("toggle");
    }
  };
  return (
    <div className="menu-wrap">
      <div className="menu-wheel">
        <Toggle
          className={toggleName}
          onClick={openMenu}
          icon={toggleIcon}
        ></Toggle>
        <Link className="link" to="/Pong">
          <MenuButton
            className={"zero" + iconName}
            icon={faPlayCircle}
            iconClassName="play"
          ></MenuButton>
        </Link>
        <Link className="link" to="/Spectate">
          <MenuButton
            className={"one" + iconName}
            icon={faBinoculars}
            iconClassName="bino"
          ></MenuButton>
        </Link>
        <Link className="link" to="/Profile">
          <MenuButton
            className={"two" + iconName}
            icon={faUser}
            iconClassName="user"
          ></MenuButton>
        </Link>
        <Link className="link" to="/Leaderboard">
          <MenuButton
            className={"three" + iconName}
            icon={faRankingStar}
            iconClassName="leader"
          ></MenuButton>
        </Link>
        <Link className="link" to="/Achievment">
          <MenuButton
            className={"four" + iconName}
            icon={faTrophy}
            iconClassName="achiev"
          ></MenuButton>
        </Link>
        <Link className="link" to="/Chat">
          <MenuButton
            className={"five" + iconName}
            icon={faCommentDots}
            iconClassName="chat"
          ></MenuButton>
        </Link>
      </div>
    </div>
  );
};

export default MenuWheel;
