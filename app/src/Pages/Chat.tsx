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
import axios from "axios";
import Cookies from "js-cookie";

const Chat = (props: Chat_) => {
  const [messages, setMessages] = useState<Message_[]>([]);
  const [roomId, setRoomId] = useState<number>(0);
  const [channels, setChannels] = useState<AxiosResponse<any, any>>();
  const [publicChannels, setPublicChannels] =
    useState<AxiosResponse<any, any>>();
  const [socket, setSocket] = useState<Socket>();
  const [mid, setMid] = useState<JSX.Element>(<></>);

  const messageListener = (message: Message_) => {
    setMessages((current) => [...current, message]);
  };

  useEffect(() => {
    if (roomId !== 0) {
      axios
        .get("http://localhost:3030/chat/convo", {
          params: {
            id: roomId,
          },
          withCredentials: true,
          headers: {
            Authorization: `bearer ${Cookies.get("jwtToken")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setMessages(response.data);
        });
    } else {
      setMessages([]);
    }
  }, [roomId]);
  useEffect(() => {
    const newSocket = io("localhost:6005");
    setSocket(newSocket);
  }, [setSocket]);

  useEffect(() => {
    if (roomId === 0) {
      setMid(
        <div className={styles["mid"]}>
          <MessageWindow
            setMessages={setMessages}
            messages={messages}
            chatRoom={roomId}
          ></MessageWindow>
        </div>
      );
    } else {
      setMid(
        <div className={styles["mid"]}>
          <MessageWindow
            setMessages={setMessages}
            messages={messages}
            chatRoom={roomId}
          ></MessageWindow>
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
  }, [roomId, messages, socket]);

  useEffect(() => {
    getChannels(setChannels, setPublicChannels);
    socket?.on("messageReceived", messageListener);
    return () => {
      socket?.off("messageReceived", messageListener);
    };
  }, [socket]);
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
