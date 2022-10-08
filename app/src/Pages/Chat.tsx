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
import {
  clickChannel,
  getChannels,
  getChatRequest,
  getDM,
  isAdminRequest,
} from "../components/Chat/ChatUtils";
import { Socket, io } from "socket.io-client";
import { ProfileContext } from "../App";
import { useLocation } from "react-router-dom";

const Chat = (props: Chat_) => {
  const profileName = useContext(ProfileContext);
  const [messages, setMessages] = useState<Message_[]>([]);
  const [roomId, setRoomId] = useState<number>(0);
  const [channels, setChannels] = useState<AxiosResponse<any, any>>();
  const [publicChannels, setPublicChannels] =
    useState<AxiosResponse<any, any>>();
  const [socket, setSocket] = useState<Socket>();
  const [mid, setMid] = useState<JSX.Element>(<></>);
  const [members, setMembers] = useState<string[]>([]);
  const [friends, setFriends] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [channelsTrigger, setChannelsTrigger] = useState<boolean>(false);
  const location = useLocation();

  //TO DO -> automaticly open to DM if otherName is not empty
  let otherName: string;
  if (location.state) {
    otherName = location.state.otherName;
  } else {
    otherName = "";
  }

  const messageListener = (message: Message_) => {
    setMessages((current) => [...current, message]);
  };

  useEffect(() => {
    if (channelsTrigger === true) {
      getChannels(setChannels, setPublicChannels);
      setChannelsTrigger(false);
    }
  }, [channelsTrigger]);

  useEffect(() => {
    if (roomId !== 0) {
      getChatRequest(setMessages, setMembers, roomId, profileName, setFriends);
      isAdminRequest(roomId, profileName).then((res) => {
        setIsAdmin(res);
      });
    } else {
      setMessages([]);
      setMembers([]);
    }
  }, [roomId]);
  useEffect(() => {
    const newSocket = io("localhost:6005");
    console.log("chat socket conencted");
    setSocket(newSocket);
    if (otherName !== "") {
      getDM(otherName, setChannelsTrigger).then((newID) => {
        console.log(newID);
        clickChannel(roomId, Number(newID), setRoomId, socket);
        location.state = null;
      });
    }
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
        <Members
          id={roomId}
          setId={setRoomId}
          members={members}
          isAdmin={isAdmin}
          channelTrigger={setChannelsTrigger}
        ></Members>
        <ChatFriendsList
          friends={friends}
          setFriends={setFriends}
          username={profileName}
          setRoomId={setRoomId}
          channelTrigger={setChannelsTrigger}
        ></ChatFriendsList>
      </div>
    </div>
  );
};

export default Chat;
