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
  const [iconName, setIconName] = useState("toggle");
  const [opening, setOpening] = useState(false);
  const [toggleIcon, setToggleicon] = useState(faBars);
  const openMenu: MouseEventHandler<HTMLDivElement> = () => {
    if (opening == false) {
      setOpening(true);
      setToggleicon(faX);
      setIconName("toggle-test");
      console.log(opening);
    } else {
      setOpening(false);
      setToggleicon(faBars);
      console.log(opening);
      setIconName("toggle");
    }
  };
  let MenuComp = (
    <div className="menu-wrap">
      <div className="menu">
        <Toggle
          className={iconName}
          onClick={openMenu}
          icon={toggleIcon}
        ></Toggle>
        {/* <MenuButton className={iconName} icon={faPlayCircle}></MenuButton>
        <MenuButton className={iconName} icon={faBinoculars}></MenuButton>
        <MenuButton className={iconName} icon={faUser}></MenuButton>
        <MenuButton className={iconName} icon={faRankingStar}></MenuButton>
        <MenuButton className={iconName} icon={faTrophy}></MenuButton>
        <MenuButton className={iconName} icon={faCommentDots}></MenuButton> */}
      </div>
    </div>
  );

  return MenuComp;
};

export default Menu;
