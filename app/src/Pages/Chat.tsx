import styles from "./Chat.module.css";
import { useState, useEffect } from "react";
import InputZone from "../components/Chat/Messages/InputZone";
import MessageWindow from "../components/Chat/Messages/MessageWindow";
import ChatChannels from "../components/Chat/Channel/ChatChannels";
import ChatFriendsList from "../components/Chat/Users/ChatFriendsList";
import { Chat_ } from "../interfaces";
import Members from "../components/Chat/Users/Members";
import { Message_ } from "../interfaces";
import { AxiosResponse } from "axios";
import { getChannels } from "../components/Chat/ChatUtils";
import { Socket, io } from "socket.io-client";
import { ProfileContext } from "../App";

const Chat = (props: Chat_) => {
  const [messages, setMessages] = useState<Message_[]>([]);
  const [roomId, setRoomId] = useState<number>(0);
  const [channels, setChannels] = useState<AxiosResponse<any, any>>();
  const [publicChannels, setPublicChannels] =
    useState<AxiosResponse<any, any>>();
  const [socket, setSocket] = useState<Socket>();
  const [mid, setMid] = useState<JSX.Element>(<></>);

  useEffect(() => {
    const newSocket = io("localhost:6005");
    setSocket(newSocket);
    console.log("Chat socket set");
  }, [setSocket, roomId]);

  useEffect(() => {
    if (roomId === 0) {
      setMid(
        <div className={styles["mid"]}>
          <MessageWindow messages={messages} chatRoom={roomId}></MessageWindow>
        </div>
      );
    } else {
      setMid(
        <div className={styles["mid"]}>
          <MessageWindow messages={messages} chatRoom={roomId}></MessageWindow>
          <InputZone
            setMessages={setMessages}
            messages={messages}
            chatRoom={roomId}
            setSocket={setSocket}
            socket={socket}
          ></InputZone>
          ;
        </div>
      );
    }
  }, [roomId, messages]);
  useEffect(() => {
    getChannels(setChannels, setPublicChannels);
  }, []);
  return (
    <div className={styles["chat-wrapper"]}>
      <div className={styles["left"]}>
        <ChatChannels
          userChannels={channels}
          setUserChannels={setChannels}
          setPublic={setPublicChannels}
          publicChannels={publicChannels}
          setRoomID={setRoomId}
          currentID={roomId}
          setSocket={setSocket}
          socket={socket}
        ></ChatChannels>
      </div>
      {mid}
      <div className={styles["right"]}>
        <Members></Members>
        <ChatFriendsList></ChatFriendsList>
      </div>
    </div>
  );
};

export default Chat;
