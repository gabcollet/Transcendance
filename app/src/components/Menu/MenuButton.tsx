import "./MenuButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEventHandler, useState } from "react";

interface _Button {
  icon: any;
  className: string;
  iconClassName: string;
  //   i: number;
}

const MenuButton = (props: _Button) => {
  const [hover, setHover] = useState(false);
  const handleHover = () => {
    setHover(true);
  };
  const handleOut = () => {
    setHover(false);
  };

  return (
    <li
      onMouseOver={handleHover}
      onMouseOut={handleOut}
      className={props.className}
    >
      <a href="#">
        <FontAwesomeIcon
          className={props.iconClassName}
          icon={props.icon}
        ></FontAwesomeIcon>
      </a>
      {/* {hover && <p className="text-box">Test</p>} */}
    </li>
  );
};

export default MenuButton;
