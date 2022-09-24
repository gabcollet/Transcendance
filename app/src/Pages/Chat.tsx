import styles from "./Chat.module.css";
import { useState } from "react";
import InputZone from "../components/Chat/InputZone";
import MessageWindow from "../components/Chat/MessageWindow";
import ChatChannels from "../components/Chat/ChatChannels";
import ChatFriendsList from "../components/Chat/ChatFriendsList";
import Members from "../components/Chat/Members";

interface Convo_ {
  message: string;
  author: string;
}

interface Profile_ {}
interface ChatRoom_ {
  title: string;
  convo: Convo_;
  id: number;
  members: Profile_;
}

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [roomId, setRoomId] = useState<number>(0);
  const [userChannels, setUserChannels] = useState<number[]>([]);
  const [publicChannels, setPublicChannels] = useState<number[]>([]);

  return (
    <div className={styles["chat-wrapper"]}>
      <div className={styles["left"]}>
        <ChatChannels
          userChannels={userChannels}
          setUserChannels={setUserChannels}
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
