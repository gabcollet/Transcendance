import "./Chat.css";
import React, { useState, useEffect } from "react";
import { socket } from "../context/socket";
import { type } from "os";
import { NavLink } from "react-router-dom";
import InputZone from "../components/Chat/InputZone";
import MessageWindow from "../components/Chat/MessageWindow";
import ChatChannels from "../components/Chat/ChatChannels";
import ChatFriendsList from "../components/Chat/ChatFriendsList";
import io, { Socket } from "socket.io-client";

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
        <ChatFriendsList></ChatFriendsList>
      </div>
    </div>
  );
};

export default Chat;
