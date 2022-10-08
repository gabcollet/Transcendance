import { useEffect, useState } from "react";
import { Username_ } from "../../../interfaces";
import { fetchObject } from "../../Profile/FetchValue";
import { User } from "../../Profile/ProfileInterfaces";
import { UserImage } from "../../Profile/UserImage";
import styles from "./ChatProfileCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

// Takes in "username" as props, which is the username of the user
export const ChatProfileCard = (props: Username_) => {
  const [chatUser, setChatUser] = useState<User>({});
  let icon = <></>;
  if (props.admin === true) {
    icon = <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>;
  }
  useEffect(() => {
    fetchObject("users/" + props.username, setChatUser);
  }, [props.username]);
  return (
    <div className={styles["chat-card-container"]}>
      <div className={styles["profile-picture-container"]}>
        <UserImage
          className={styles["chatPicture"]}
          username={props.username}
        />
      </div>
      <div className={styles["profile-info-container"]}>
        <h4 className={styles["profile-name"]}>{chatUser.displayname}</h4>
        <p className={styles["profile-status"]}>{chatUser.status}</p>
      </div>
      {icon}
    </div>
  );
};
