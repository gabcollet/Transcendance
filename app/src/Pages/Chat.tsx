import "./Chat.css";
import { useState } from "react";
import InputZone from "../components/Chat/InputZone";
import MessageWindow from "../components/Chat/MessageWindow";
import ChatChannels from "../components/Chat/ChatChannels";
import ChatFriendsList from "../components/Chat/ChatFriendsList";
import Members from "../components/Chat/Members";

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  return (
    <div className="chat-wrapper">
      <div className="left">
        <ChatChannels></ChatChannels>
      </div>
      <div className="mid">
        <MessageWindow messages={messages}></MessageWindow>
        <InputZone setMessages={setMessages} messages={messages}></InputZone>;
      </div>
      <div className="right">
        <Members></Members>
        <ChatFriendsList></ChatFriendsList>
      </div>
    </div>
  );
};

export default Chat;
