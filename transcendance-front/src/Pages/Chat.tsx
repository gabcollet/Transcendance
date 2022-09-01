import "./Chat.css";
// import ChatInput from "../components/Chat/ChatInput";
import SendButton from "../components/Chat/SendButton";
import React, { useState, useRef } from "react";
import { socket } from "../context/socket";
import { type } from "os";
import { NavLink } from "react-router-dom";

const Chat = () => {
  const [chatInput, setChatInput] = React.useState("");

  const sendMsg = () => {
    console.log(chatInput);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(event.target.value);
  };
  return (
    <div>
      <input
        onChange={handleInputChange}
        placeholder="Enter your message"
      ></input>
      <button onClick={sendMsg}>Send</button>
    </div>
  );
};

export default Chat;
