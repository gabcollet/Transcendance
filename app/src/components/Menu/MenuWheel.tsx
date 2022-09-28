import {
  faCommentDots,
  faPlayCircle,
  faTrophy,
  faRankingStar,
  faUser,
  faBinoculars,
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import Toggle from "./Toggle";
import _Toggle from "./Toggle";
import MenuButton from "./MenuButton";
import { MouseEventHandler, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MenuWheel.module.css";
import { MenuWheel_ } from "../../interfaces";
import { socket } from "../../Pages/PongRoom";

const MenuWheel = (props: MenuWheel_) => {
  const [toggleName, setToggleName] = useState("toggle");
  const [iconName, setIconName] = useState("");
  const [toggleIcon, setToggleicon] = useState(faBars);

  useEffect(() => {
    if (props.opening === true) {
      setToggleicon(faX);
      setIconName("-t");
      setToggleName("toggle-open");
    }
  }, []);

  const openMenu: MouseEventHandler<HTMLDivElement> = () => {
    if (props.opening === false) {
      props.setOpening(true);
      setToggleicon(faX);
      setIconName("-t");
      setToggleName("toggle-open");
    } else {
      props.setOpening(false);
      setToggleicon(faBars);
      setIconName("");
      setToggleName("toggle");
    }
  };

  const spectate = () => {
    socket.emit("spectate");
  };

  return (
    <div className={styles["menu-wrap"]}>
      <div className={styles["menu-wheel"]}>
        <Toggle
          className={toggleName}
          onClick={openMenu}
          icon={toggleIcon}
        ></Toggle>
        <Link className={styles["link"]} to="/PongRoom">
          <MenuButton
            className={"zero" + iconName}
            icon={faPlayCircle}
            iconClassName="play"
          ></MenuButton>
        </Link>
        <Link className={styles["link"]} to="/Pong">
          <MenuButton
            onClick={spectate}
            className={"one" + iconName}
            icon={faBinoculars}
            iconClassName="bino"
          ></MenuButton>
        </Link>
        <Link className={styles["link"]} to="/Profile">
          <MenuButton
            className={"two" + iconName}
            icon={faUser}
            iconClassName="user"
          ></MenuButton>
        </Link>
        <Link className={styles["link"]} to="/Leaderboard">
          <MenuButton
            className={"three" + iconName}
            icon={faRankingStar}
            iconClassName="leader"
          ></MenuButton>
        </Link>
        <Link className={styles["link"]} to="/Achievment">
          <MenuButton
            className={"four" + iconName}
            icon={faTrophy}
            iconClassName="achiev"
          ></MenuButton>
        </Link>
        <Link className={styles["link"]} to="/Chat">
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
