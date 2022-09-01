import "./Toggle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEventHandler } from "react";

interface _Toggle {
  icon: any;
  onClick: MouseEventHandler<HTMLDivElement>;
  className: string;
}

const Toggle = (props: _Toggle) => {
  return (
    <div onClick={props.onClick} className={props.className}>
      <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
    </div>
  );
};

export default Toggle;
