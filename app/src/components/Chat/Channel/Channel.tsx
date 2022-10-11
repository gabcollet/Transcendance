import styles from "./Channel.module.css";
import {
  faCircleXmark,
  faCirclePlus,
  faCommentDots,
  faCog,
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
import { isOwner } from "../ChatUtils";
import OwnerPopup from "./OwnerPopup";

const Channel = (props: Channel_) => {
  let icon = <></>;
  let chatIcon = <></>;
  const [boxStyle, setBoxStyle] = useState<string>("channel-box");
  const [owner, setOwner] = useState(false);
  const [ownerIcon, setOwnerIcon] = useState(<></>);
  const [ownerTrigger, setOwnerTrigger] = useState(false);

  props.socket?.on("joined", (message: any) => {
    props.setJoinedAlert(true);
  });
  useEffect(() => {
    isOwner(props.id, setOwner).then((res) => {
      if (res === true) {
        setOwnerIcon(
          <FontAwesomeIcon
            className={styles["owner-icon"]}
            icon={faCog}
            onClick={() => {
              props.setOwnerTrigger(true);
            }}
          ></FontAwesomeIcon>
        );
      }
    });
  }, []);
  const channelClick = async () => {
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
              if (res === "protected") {
                props.setPasswordID(props.id);
                props.setPasswordTrigger(true);
              }
              if (res === "banned") {
                alert("Banned from channel");
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
          {ownerIcon}
        </div>
      </div>
    </div>
  );
};

export default Channel;
