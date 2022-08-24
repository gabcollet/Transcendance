import React, { ReactElement } from "react";
import "./MenuToggle.css";

const MenuToggle = (icon: any) => {
  const openMenu = () => {
    console.log("it works");
  };
  return <div onClick={openMenu} className="toggle"></div>;
};

export default MenuToggle;
