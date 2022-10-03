import styles from "./Chat.module.css";
import { useState, useEffect } from "react";
import InputZone from "../components/Chat/Messages/InputZone";
import MessageWindow from "../components/Chat/Messages/MessageWindow";
import ChatChannels from "../components/Chat/Channel/ChatChannels";
import ChatFriendsList from "../components/Chat/Users/ChatFriendsList";
import { Chat_ } from "../interfaces";
import Members from "../components/Chat/Users/Members";
import { Message_ } from "../interfaces";
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { getChannels } from "../components/Chat/ChatUtils";
const Chat = (props: Chat_) => {
  const [messages, setMessages] = useState<Message_[]>([]);
  const [roomId, setRoomId] = useState<number>(0);
  const [channels, setChannels] = useState<AxiosResponse<any, any>>();
  const [publicChannels, setPublicChannels] =
    useState<AxiosResponse<any, any>>();

  useEffect(() => {
    getChannels(setChannels, setPublicChannels);
  }, []);
  if (roomId !== 0) {
    setRoomId(1);
  }
  return (
    <div className={styles["chat-wrapper"]}>
      <div className={styles["left"]}>
        <ChatChannels
          userChannels={channels}
          setUserChannels={setChannels}
          setPublic={setPublicChannels}
          publicChannels={publicChannels}
        ></ChatChannels>
      </div>
      <div className={styles["mid"]}>
        <MessageWindow messages={messages} chatRoom={roomId}></MessageWindow>
        <InputZone
          setMessages={setMessages}
          messages={messages}
          chatRoom={roomId}
        ></InputZone>
        ;
      </div>
      <div className={styles["right"]}>
        <Members></Members>
        <ChatFriendsList></ChatFriendsList>
      </div>
    </div>
  );
};

export default Chat;
