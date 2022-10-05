import styles from "./Channel.module.css";
import {
  faCircleXmark,
  faCirclePlus,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Channel_ } from "../../../interfaces";
import { joinChannel, removeChannel } from "../ChatUtils";
import { useEffect, useState } from "react";

const Channel = (props: Channel_) => {
  let icon = <></>;
  let chatIcon = <></>;

  const [boxStyle, setBoxStyle] = useState<string>("channel-box");
  let channelClick = () => {
    if (props.joined === true) {
      props.socket?.emit("leaveRoom", { chatRoom: props.currentID });
      props.socket?.emit("joinRoom", { chatRoom: props.id, user: "test" });
      props.socket?.on("joined", (message: any) => {});
      props.setRoomID(props.id);
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
    icon = (
      <FontAwesomeIcon
        className={styles["leave-icon"]}
        icon={faCircleXmark}
        onClick={() => {
          removeChannel(props.id, props.setUserChannels, props.setPublic);
          props.setRoomID(0);
        }}
      ></FontAwesomeIcon>
    );
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
          joinChannel(props.id, props.setUserChannels, props.setPublic);
        }}
      ></FontAwesomeIcon>
    );
  }
  return (
    <div className={styles["channel-wrapper"]}>
      <div className={styles[boxStyle]}>
        {" "}
        <p>{props.title}</p>
        {chatIcon}
        {icon}
      </div>
    </div>
  );
};

export default Channel;
