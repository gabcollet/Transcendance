import styles from "./Chat.module.css";
import { useState, useEffect, useContext } from "react";
import InputZone from "../components/Chat/Messages/InputZone";
import MessageWindow from "../components/Chat/Messages/MessageWindow";
import ChatChannels from "../components/Chat/Channel/ChatChannels";
import ChatFriendsList from "../components/Chat/Users/ChatFriendsList";
import Members from "../components/Chat/Users/Members";
import { Message_ } from "../interfaces";
import { AxiosResponse } from "axios";
import {
  clickChannel,
  getChannels,
  getChatMembers,
  getChatRequest,
  getDM,
  isAdminRequest,
} from "../components/Chat/ChatUtils";
import { Socket, io } from "socket.io-client";
import { ProfileContext } from "../App";
import { useLocation } from "react-router-dom";
import { fetchObject } from "../components/Profile/FetchValue";

const Chat = () => {
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
  const [blockedUsers, setBlockedUsers] = useState(Object);
  const location = useLocation();

  let otherName: string;
  if (location.state) {
    otherName = location.state.otherName;
  } else {
    otherName = "";
  }

  useEffect(() => {
    const getBlockedUsers = async () => {
      if (profileName) {
        await fetchObject(
          "users/" + profileName + "/blockedusers",
          setBlockedUsers
        );
      }
    };
    getBlockedUsers();
  }, [profileName]);

  useEffect(() => {
    if (channelsTrigger === true) {
      getChannels(setChannels, setPublicChannels);
      setChannelsTrigger(false);
    }
  }, [channelsTrigger]);

  useEffect(() => {
    if (roomId !== 0) {
      getChatRequest(setMessages, setMembers, roomId, setFriends);
      isAdminRequest(roomId, profileName).then((res) => {
        setIsAdmin(res);
      });
    } else {
      setMessages([]);
      setMembers([]);
    }
  }, [roomId, profileName]);

  useEffect(() => {
    const newSocket = io("localhost:6005");
    console.log("chat socket connected");
    setSocket(newSocket);
  }, [setSocket]);

  useEffect(() => {
    if (socket && otherName !== "") {
      getDM(otherName, setChannelsTrigger).then((newID) => {
        clickChannel(0, Number(newID), setRoomId, socket);
      });
    }
  }, [socket, otherName]);

  useEffect(() => {
    const messageWindow = (
      <MessageWindow
        setMessages={setMessages}
        messages={messages}
        chatRoom={roomId}
      ></MessageWindow>
    );
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
    // Function returns true if "user" is in the list of blockedUsers
    const compareBlockedUsers = (user: string) => {
      if (blockedUsers?.blockedUsernames && profileName) {
        for (const username of blockedUsers.blockedUsernames) {
          if (username === user) {
            return true;
          }
        }
      }
      return false;
    };
    const messageListener = (message: Message_) => {
      if (compareBlockedUsers(message.author) === false) {
        setMessages((current) => [...current, message]);
      }
    };

    const joinedListener = async (room: any) => {
      if (room !== 0) {
        const joinlist = await getChatMembers(room);
        if (room === roomId) setMembers(joinlist);
      }
    };
    const invitedListener = async (room: any) => {
      alert(room);
    };

    getChannels(setChannels, setPublicChannels);
    socket?.on("messageReceived", messageListener);
    socket?.on("joined", joinedListener);
    socket?.on("leaved", joinedListener);
    socket?.on("invited", invitedListener);
    return () => {
      socket?.off("messageReceived", messageListener);
      socket?.off("joined", joinedListener);
      socket?.off("leaved", joinedListener);
    };
  }, [socket, roomId, blockedUsers?.blockedUsernames, profileName]);
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
          setMembers={setMembers}
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
          setMembers={setMembers}
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
