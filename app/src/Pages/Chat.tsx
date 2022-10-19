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
import { socket } from "./PongRoom";
import InvitePopup from "../components/Chat/InvitePopup";

const Chat = (props:any) => {
  const profileName = useContext(ProfileContext);
  const [messages, setMessages] = useState<Message_[]>([]);
  const [roomId, setRoomId] = useState<number>(0);
  const [channels, setChannels] = useState<AxiosResponse<any, any>>();
  const [publicChannels, setPublicChannels] =
    useState<AxiosResponse<any, any>>();
  const [socketChat, setSocket] = useState<Socket>();
  const [mid, setMid] = useState<JSX.Element>(<></>);
  const [members, setMembers] = useState<string[]>([]);
  const [friends, setFriends] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [channelsTrigger, setChannelsTrigger] = useState<boolean>(false);
  const [blockedUsers, setBlockedUsers] = useState(Object);
  const [inviteTrigger, setInviteTrigger] = useState(false);
  const [inviteID, setInviteID] = useState("");
  const [invitee, setInvitee] = useState("");
  const location = useLocation();

  let otherName: string;
  if (location.state) {
    otherName = location.state.otherName;
  } else {
    otherName = "";
  }

  useEffect(() => {
    socket.emit("leaveRoom");
  }, [location]);

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
    // console.log("chat socket connected");
    setSocket(newSocket);
  }, [setSocket]);

  useEffect(() => {
    if (socketChat && otherName !== "") {
      getDM(otherName, setChannelsTrigger).then((newID) => {
        clickChannel(0, Number(newID), setRoomId, socketChat);
      });
    }
  }, [socketChat, otherName]);

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
            socket={socketChat}
          ></InputZone>
        </div>
      );
    }
  }, [roomId, messages, socketChat]);

  useEffect(() => {
    const invitedListener = async (payload: any) => {
      setInviteTrigger(true);
      setInviteID(payload.room);
      setInvitee(payload.user);
    };
    socket.on("invited", invitedListener);
  });

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

    getChannels(setChannels, setPublicChannels);
    socketChat?.on("messageReceived", messageListener);
    socketChat?.on("joined", joinedListener);
    socketChat?.on("leaved", joinedListener);
    return () => {
      socketChat?.off("messageReceived", messageListener);
      socketChat?.off("joined", joinedListener);
      socketChat?.off("leaved", joinedListener);
    };
  }, [socketChat, roomId, blockedUsers?.blockedUsernames, profileName]);

  useEffect(() => {
    const alarmListener = async () => {
      getChatRequest(setMessages, setMembers, roomId, setFriends);
      getChannels(setChannels, setPublicChannels);
    };
    socketChat?.on("alarm-channel", alarmListener);
    socketChat?.on("alarm-all", alarmListener);
  }, [socketChat, roomId]);
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
          socket={socketChat}
          setMembers={setMembers}
        ></ChatChannels>
      </div>
      {mid}
      <InvitePopup
        trigger={inviteTrigger}
        invitee={invitee}
        roomID={inviteID}
        setTrigger={setInviteTrigger}
      ></InvitePopup>
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
          isAdmin={isAdmin}
          roomID={roomId}
        ></ChatFriendsList>
      </div>
    </div>
  );
};

export default Chat;
