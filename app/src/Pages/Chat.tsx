import styles from "./Chat.module.css";
import { useState, useEffect, useContext } from "react";
import InputZone from "../components/Chat/Messages/InputZone";
import MessageWindow from "../components/Chat/Messages/MessageWindow";
import ChatChannels from "../components/Chat/Channel/ChatChannels";
import ChatFriendsList from "../components/Chat/Users/ChatFriendsList";
import { Chat_ } from "../interfaces";
import Members from "../components/Chat/Users/Members";
import { Message_ } from "../interfaces";
import { AxiosResponse } from "axios";
import { getChannels, getChatRequest } from "../components/Chat/ChatUtils";
import { Socket, io } from "socket.io-client";
import axios from "axios";
import Cookies from "js-cookie";
import { OtherUsernameContext, ProfileContext } from "../App";

const Chat = (props: Chat_) => {
  const profileName = useContext(ProfileContext);
  const otherUsernameContext = useContext(OtherUsernameContext);

  const [messages, setMessages] = useState<Message_[]>([]);
  const [roomId, setRoomId] = useState<number>(0);
  const [channels, setChannels] = useState<AxiosResponse<any, any>>();
  const [publicChannels, setPublicChannels] =
    useState<AxiosResponse<any, any>>();
  const [socket, setSocket] = useState<Socket>();
  const [mid, setMid] = useState<JSX.Element>(<></>);
  const [members, setMembers] = useState<string[]>([]);
  const [friends, setFriends] = useState<string[]>([]);
  const otherName =
    otherUsernameContext === "" ? props.userName : otherUsernameContext;

  console.log(`This is otherUsernamecontext: ${otherUsernameContext}`);
  console.log(`THIS IS OTHERNAME: ${otherName}`);

  const messageListener = (message: Message_) => {
    setMessages((current) => [...current, message]);
  };

  useEffect(() => {
    if (roomId !== 0) {
      getChatRequest(setMessages, setMembers, roomId, profileName, setFriends);
      console.log("Friend list");
    } else {
      setMessages([]);
      setMembers([]);
    }
  }, [roomId]);
  useEffect(() => {
    const newSocket = io("localhost:6005");
    setSocket(newSocket);
  }, [setSocket]);
  const messageWindow = (
    <MessageWindow
      setMessages={setMessages}
      messages={messages}
      chatRoom={roomId}
    ></MessageWindow>
  );
  useEffect(() => {
    if (roomId === 0) {
      setMid(<div className={styles["mid"]}>{messageWindow}</div>);
    } else {
      setMid(
        <div className={styles["mid"]}>
          {messageWindow}
          <InputZone
            setMessages={setMessages}
            messages={messages}
            chatRoom={roomId}
            setSocket={setSocket}
            socket={socket}
          ></InputZone>
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
        <Members id={roomId} members={members}></Members>
        <ChatFriendsList
          friends={friends}
          setFriends={setFriends}
          username={profileName}
        ></ChatFriendsList>
      </div>
    </div>
  );
};

export default Chat;
