import "./Chat.css";
import React, { useState, useRef } from "react";
import { socket } from "../context/socket";
import { type } from "os";
import { NavLink } from "react-router-dom";
import InputZone from "../components/Chat/InputZone";
import MessageWindow from "../components/Chat/MessageWindow";
import ChatChannels from "../components/Chat/ChatChannels";
import ChatFriendsList from "../components/Chat/ChatFriendsList";

const Chat = () => {
  const [chatInput, setChatInput] = React.useState("");

  const sendMsg = () => {
    console.log(chatInput);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(event.target.value);
  };
  return (
    <div className="chat-wrapper">
      <div className="left">
        <ChatChannels></ChatChannels>
      </div>
      <div className="mid">
        <MessageWindow></MessageWindow>
        <InputZone></InputZone>;
      </div>
      <div className="right">
        <ChatFriendsList></ChatFriendsList>
      </div>
    </div>
  );
};

export default Chat;
