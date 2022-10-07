import styles from "../Channel/AddPopup.module.css";
import { UserPopup_ } from "../../../interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ChatProfileCard } from "./ChatProfileCard";
import {
  faCircleXmark,
  faSheetPlastic,
} from "@fortawesome/free-solid-svg-icons";
import { UserImage } from "../../Profile/UserImage";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";

const UserPopup = (props: UserPopup_) => {
  const handleExit = () => {
    props.setTrigger(false);
  };
  const popup = (
    <div className={styles["addpop-wrap"]}>
      <div className={styles["addpop-in-user"]}>
        <FontAwesomeIcon
          className={styles["exit"]}
          icon={faCircleXmark}
          onClick={handleExit}
        ></FontAwesomeIcon>
        <div className={styles["user-info"]}>
          <UserImage
            className={styles["chatPicture"]}
            username={props.username}
          />
          <h4 className={styles["profile-name"]}>{props.username}</h4>
          <div className={styles["admin-wrap"]}>
            <div className={styles["give-wrap"]}>
              <p className={styles["admin-title"]}>Grant Admin</p>
              <FontAwesomeIcon
                className={styles["give-admin"]}
                icon={faShieldHalved}
              ></FontAwesomeIcon>
            </div>
            <div className={styles["give-wrap"]}>
              <p className={styles["admin-title-ban"]}>Ban User</p>
              <button className={styles["timeout"]}>10M</button>
              <button className={styles["timeout"]}>1J</button>
              <button className={styles["timeout"]}>1W</button>
            </div>
            <div className={styles["give-wrap"]}>
              <p className={styles["admin-title"]}>Mute User</p>
              <button className={styles["timeout"]}>10M</button>
              <button className={styles["timeout"]}>1J</button>
              <button className={styles["timeout"]}>1W</button>
            </div>
          </div>
        </div>
        <div className={styles["action-bar"]}></div>
      </div>
    </div>
  );
  return props.trigger ? popup : <></>;
};

export default UserPopup;
