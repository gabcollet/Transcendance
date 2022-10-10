import styles from "../Channel/AddPopup.module.css";
import { UserPopup_ } from "../../../interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ChatProfileCard } from "./ChatProfileCard";
import {
  faCircleXmark,
  faSheetPlastic,
} from "@fortawesome/free-solid-svg-icons";
import { UserImage } from "../../Profile/UserImage";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { isAdminRequest } from "../ChatUtils";
import { giveAdmin } from "../ChatUtils";
import { restrictUser } from "../ChatUtils";

const UserPopup = (props: UserPopup_) => {
  const [adminComponent, setAdminComponent] = useState(<></>);
  const handleExit = () => {
    props.setTrigger(false);
  };
  useEffect(() => {
    isAdminRequest(props.currentRoom, props.username).then((res) => {
      if (res === false) {
        setAdminComponent(
          <div className={styles["admin-wrap"]}>
            <div className={styles["give-wrap"]}>
              <p className={styles["admin-title"]}>Grant Admin</p>
              <FontAwesomeIcon
                className={styles["give-admin"]}
                icon={faShieldHalved}
                onClick={() => {
                  giveAdmin(props.currentRoom, props.username);
                }}
              ></FontAwesomeIcon>
            </div>
            <div className={styles["give-wrap"]}>
              <p className={styles["admin-title-ban"]}>Ban User</p>
              <button
                className={styles["timeout"]}
                onClick={() => {
                  restrictUser(props.username, props.currentRoom, 10, "ban");
                }}
              >
                10M
              </button>
              <button
                className={styles["timeout"]}
                onClick={() => {
                  restrictUser(props.username, props.currentRoom, 24, "ban");
                }}
              >
                1J
              </button>
              <button
                className={styles["timeout"]}
                onClick={() => {
                  restrictUser(props.username, props.currentRoom, 7, "ban");
                }}
              >
                1W
              </button>
            </div>
            <div className={styles["give-wrap"]}>
              <p className={styles["admin-title"]}>Mute User</p>
              <button
                className={styles["timeout"]}
                onClick={() => {
                  restrictUser(props.username, props.currentRoom, 10, "mute");
                }}
              >
                10M
              </button>
              <button
                className={styles["timeout"]}
                onClick={() => {
                  restrictUser(props.username, props.currentRoom, 7, "mute");
                }}
              >
                1J
              </button>
              <button
                className={styles["timeout"]}
                onClick={() => {
                  restrictUser(props.username, props.currentRoom, 24, "mute");
                }}
              >
                1W
              </button>
            </div>
          </div>
        );
      } else {
        setAdminComponent(
          <div className={styles["admin-wrap"]}>
            <p className={styles["restricted"]}>Restricted: Admin</p>
          </div>
        );
      }
    });
  }, [props.trigger]);
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
          {adminComponent}
        </div>
        <div className={styles["action-bar"]}></div>
      </div>
    </div>
  );
  return props.trigger ? popup : <></>;
};

export default UserPopup;
