import "./Menu.css";
import Toggle from "./Toggle";
import _Toggle from "./Toggle";
import MenuButton from "./MenuButton";
import React, { MouseEventHandler, useState } from "react";

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

const Menu = () => {
  const [toggleName, setToggleName] = useState("toggle");
  const [opening, setOpening] = useState(false);
  const [iconName, setIconName] = useState("");
  const [toggleIcon, setToggleicon] = useState(faBars);
  const openMenu: MouseEventHandler<HTMLDivElement> = () => {
    if (opening == false) {
      setOpening(true);
      setToggleicon(faX);
      setIconName("-t");
      setToggleName("toggle-open");
      console.log(opening);
    } else {
      setOpening(false);
      setToggleicon(faBars);
      console.log(opening);
      setIconName("");
      setToggleName("toggle");
    }
  };
  let MenuComp = (
    <div className="menu-wrap">
      <div className="menu">
        <Toggle
          className={toggleName}
          onClick={openMenu}
          icon={toggleIcon}
        ></Toggle>
        <MenuButton
          className={"zero" + iconName}
          icon={faPlayCircle}
          iconClassName="play"
        ></MenuButton>
        <MenuButton
          className={"one" + iconName}
          icon={faBinoculars}
          iconClassName="bino"
        ></MenuButton>
        <MenuButton
          className={"two" + iconName}
          icon={faUser}
          iconClassName="user"
        ></MenuButton>
        <MenuButton
          className={"three" + iconName}
          icon={faRankingStar}
          iconClassName="leader"
        ></MenuButton>
        <MenuButton
          className={"four" + iconName}
          icon={faTrophy}
          iconClassName="achiev"
        ></MenuButton>
        <MenuButton
          className={"five" + iconName}
          icon={faCommentDots}
          iconClassName="chat"
        ></MenuButton>
      </div>
    </div>
  );

  return MenuComp;
};

export default Menu;
