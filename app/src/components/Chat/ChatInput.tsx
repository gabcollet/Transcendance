import "./ChatInput.css";
import SendButton from "./SendButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailReply } from "@fortawesome/free-solid-svg-icons";
import io, { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";

// https://stackoverflow.com/questions/47809282/submit-a-form-when-enter-is-pressed-in-a-textarea-in-react
// FOR ENTER KEY PRESS

interface ChatInput_ {}
const ChatInput = () => {
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    const newSocket = io("localhost:6005");
    setSocket(newSocket);
  }, []);
  const [chatMessage, setChatMessage] = useState("");
  const sendMsg = (message: string) => {
    if (message != "") {
      console.log(message);
      socket?.emit("message", message);
      setChatMessage("");
    }
  };
  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
    message: string
  ) => {
    if (event.key === "Enter") {
      event.preventDefault(); // prevent newline when pressing enter
      sendMsg(message);
      setChatMessage("");
    }
  };
  return (
    <div>
      <textarea
        placeholder="Enter your message..."
        className="chat-message"
        value={chatMessage}
        onKeyPress={(event) => handleKeyPress(event, chatMessage)}
        onChange={(event) => setChatMessage(event.target.value)}
      ></textarea>
      <button className="send-button" onClick={(send) => sendMsg(chatMessage)}>
        <FontAwesomeIcon className="send-icon" icon={faMailReply} />
      </button>
    </div>
  );
};

export default ChatInput;
