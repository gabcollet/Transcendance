import ChatInput from "./ChatInput";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import styles from "./InputZone.module.css";
import { InputZone_ } from "../../../interfaces";
import { Message_ } from "../../../interfaces";

const InputZone = (props: InputZone_) => {
  const [socket, setSocket] = useState<Socket>();
  let send: Message_ = {
    msg: "",
    author: "",
    chatRoom: 1,
  };

  const messageListener = (message: Message_) => {
    props.setMessages([...props.messages, message]);
  };
  useEffect(() => {
    socket?.on("message", messageListener);
    return () => {
      socket?.off("message", messageListener);
    };
  }, [messageListener]);
  const sendMsg = (message: string) => {
    if (message !== "") {
      send.msg = message;
      send.chatRoom = props.chatRoom;
      socket?.emit("message", send);
    }
  };
  useEffect(() => {
    const newSocket = io("localhost:6005");
    setSocket(newSocket);
    console.log("Chat socket set");
  }, [setSocket]);

  return (
    <div className={styles["type-zone"]}>
      <ChatInput sendMsg={sendMsg}></ChatInput>
    </div>
  );
};

export default InputZone;
