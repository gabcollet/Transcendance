import styles from "./Channel.module.css";
import {
  faCircleXmark,
  faCirclePlus,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Channel_ } from "../../../interfaces";
import { joinChannel, joinPassword, removeChannel } from "../ChatUtils";
import { useEffect, useState } from "react";
import { PasswordPopup_ } from "../../../interfaces";
import PasswordPopup from "./PasswordPopup";
import AddPopup from "./AddPopup";
import { clickChannel } from "../ChatUtils";
import { click } from "@testing-library/user-event/dist/click";

const Channel = (props: Channel_) => {
  let icon = <></>;
  let chatIcon = <></>;
  const [boxStyle, setBoxStyle] = useState<string>("channel-box");
  let channelClick = () => {
    if (props.joined === true) {
      clickChannel(props.currentID, props.id, props.setRoomID, props.socket);
    }
  };
  useEffect(() => {
    if (props.id === props.currentID) {
      setBoxStyle("channel-box-selected");
    } else {
      setBoxStyle("channel-box");
    }
  }, [props.currentID, props.id]);
  if (props.joined === true) {
    if (props.isDM === false) {
      icon = (
        <FontAwesomeIcon
          className={styles["leave-icon"]}
          icon={faCircleXmark}
          onClick={() => {
            removeChannel(
              props.id,
              props.setUserChannels,
              props.setPublic,
              props.socket
            );
            props.setRoomID(0);
          }}
        ></FontAwesomeIcon>
      );
    } else {
      icon = <></>;
    }
    chatIcon = (
      <FontAwesomeIcon
        className={styles["chat-icon"]}
        icon={faCommentDots}
        onClick={channelClick}
      ></FontAwesomeIcon>
    );
  } else {
    icon = (
      <FontAwesomeIcon
        className={styles["join-icon"]}
        icon={faCirclePlus}
        onClick={() => {
          joinChannel(props.id, props.setUserChannels, props.setPublic).then(
            (res) => {
              if (res === false) {
                props.setPasswordID(props.id);
                props.setPasswordTrigger(true);
              }
            }
          );
        }}
      ></FontAwesomeIcon>
    );
  }
  return (
    <div>
      <div className={styles["channel-wrapper"]}>
        <div className={styles[boxStyle]}>
          {" "}
          <p>{props.title}</p>
          {chatIcon}
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Channel;
