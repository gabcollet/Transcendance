import "./MenuButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface _Button {
  icon: any;
  className: string;
  iconClassName: string;
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
    </li>
  );
};

export default MenuButton;
