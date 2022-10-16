import styles from "../Channel/AddPopup.module.css";
import { UserPopup_ } from "../../../interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faCircleXmark, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { UserImage } from "../../Profile/UserImage";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { getChatMembers, channelRights } from "../ChatUtils";
import { giveAdmin } from "../ChatUtils";
import { restrictUser } from "../ChatUtils";
import { kickUser } from "../ChatUtils";

const UserPopup = (props: UserPopup_) => {
  const [adminComponent, setAdminComponent] = useState(<></>);
  const handleExit = () => {
    props.setTrigger(false);
  };
  useEffect(() => {
    channelRights(props.currentRoom, props.username).then((res) => {
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
                  props.setTrigger(false);
                }}
              ></FontAwesomeIcon>
            </div>
            <div className={styles["give-wrap"]}>
              <p className={styles["admin-title-ban"]}>Ban User</p>
              <button
                className={styles["timeout"]}
                onClick={async () => {
                  await restrictUser(
                    props.username,
                    props.currentRoom,
                    10,
                    "ban"
                  );
                  const members = await getChatMembers(props.currentRoom);
                  props.setMembers(members);
                  props.setTrigger(false);
                }}
              >
                10M
              </button>
              <button
                className={styles["timeout"]}
                onClick={async () => {
                  await restrictUser(
                    props.username,
                    props.currentRoom,
                    24,
                    "ban"
                  );
                  const members = await getChatMembers(props.currentRoom);
                  props.setMembers(members);
                  props.setTrigger(false);
                }}
              >
                1J
              </button>
              <button
                className={styles["timeout"]}
                onClick={async () => {
                  await restrictUser(
                    props.username,
                    props.currentRoom,
                    7,
                    "ban"
                  );
                  const members = await getChatMembers(props.currentRoom);
                  props.setMembers(members);
                  props.setTrigger(false);
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
                  props.setTrigger(false);
                }}
              >
                10M
              </button>
              <button
                className={styles["timeout"]}
                onClick={() => {
                  restrictUser(props.username, props.currentRoom, 7, "mute");
                  props.setTrigger(false);
                }}
              >
                1J
              </button>
              <button
                className={styles["timeout"]}
                onClick={() => {
                  restrictUser(props.username, props.currentRoom, 24, "mute");
                  props.setTrigger(false);
                }}
              >
                1W
              </button>
            </div>
            <div
              onClick={async () => {
                await kickUser(props.username, props.currentRoom);
                const members = await getChatMembers(props.currentRoom);
                props.setMembers(members);
                props.setTrigger(false);
              }}
            >
              <FontAwesomeIcon
                icon={faUserMinus}
                className={styles["kick-icon"]}
              ></FontAwesomeIcon>
            </div>
          </div>
        );
      } else {
        setAdminComponent(
          <div className={styles["admin-wrap"]}>
            <p className={styles["restricted"]}>Restricted</p>
          </div>
        );
      }
    });
  }, [props]);
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
