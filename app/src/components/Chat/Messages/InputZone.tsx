import ChatInput from "./ChatInput";
import { useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";
import styles from "./InputZone.module.css";
import { InputZone_ } from "../../../interfaces";
import { Message_ } from "../../../interfaces";
import { ProfileContext } from "../../../App";

const InputZone = (props: InputZone_) => {
  const profileName = useContext(ProfileContext);
  let send: Message_ = {
    msg: "",
    author: "",
    chatRoom: props.chatRoom,
  };
  const messageListener = (message: Message_) => {
    props.setMessages((current) => [...current, message]);
  };
  const sendMsg = async (message: string) => {
    if (message !== "") {
      send.msg = message;
      send.chatRoom = props.chatRoom;
      send.author = profileName;
      await props.socket?.emit("sendMessage", send);
    }
  };

  return (
    <div className={styles["type-zone"]}>
      <ChatInput sendMsg={sendMsg}></ChatInput>
    </div>
  );
};

export default InputZone;
