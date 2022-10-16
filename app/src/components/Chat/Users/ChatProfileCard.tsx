import { useEffect, useState, useContext } from "react";
import { Username_ } from "../../../interfaces";
import { fetchObject } from "../../Profile/FetchValue";
import { User } from "../../Profile/ProfileInterfaces";
import { UserImage } from "../../Profile/UserImage";
import styles from "./ChatProfileCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faMessage, faPlay } from "@fortawesome/free-solid-svg-icons";
import { ProfileContext } from "../../../App";
import { getDM, invitePlay } from "../ChatUtils";
import { Link } from "react-router-dom";

// Takes in "username" as props, which is the username of the user
export const ChatProfileCard = (props: Username_) => {
  const [chatUser, setChatUser] = useState<User>({});
  let iconAdmin = <></>;
  let icons = <></>;
  const profileName = useContext(ProfileContext);
  let diffUser: boolean;
  if (profileName !== props.username) {
    diffUser = true;
  } else {
    diffUser = false;
  }
  const openMember = () => {
    props.setTrigger(true);
  };

  const handleDM = () => {
    getDM(props.username, props.channelTrigger);
  };

  if (diffUser === true) {
    if (props.admin === true) {
      iconAdmin = (
        <div className={styles["icon-wrap"]}>
          <FontAwesomeIcon
            className={styles["admin-icon"]}
            icon={faGear}
            onClick={openMember}
          ></FontAwesomeIcon>
        </div>
      );
    }
    icons = (
      <div className={styles["icon-wrap"]}>
        {iconAdmin}
        <Link to="/Pong">
          <FontAwesomeIcon
            className={styles["play-icon"]}
            icon={faPlay}
            onClick={() => {
              invitePlay(props.username, profileName);
            }}
          ></FontAwesomeIcon>
        </Link>
        <FontAwesomeIcon
          className={styles["dm-icon"]}
          icon={faMessage}
          onClick={handleDM}
        ></FontAwesomeIcon>
      </div>
    );
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
      {icons}
    </div>
  );
};
