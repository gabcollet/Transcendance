import "./ChatInput.css";
import SendButton from "./SendButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailReply } from "@fortawesome/free-solid-svg-icons";
import io, { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";

// https://stackoverflow.com/questions/47809282/submit-a-form-when-enter-is-pressed-in-a-textarea-in-react
// FOR ENTER KEY PRESS

interface ChatInput_ {
  sendMsg: (message: string) => void;
}
const ChatInput = (props: ChatInput_) => {
  const [value, setValue] = useState("");
  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
    message: string
  ) => {
    if (event.key === "Enter") {
      event.preventDefault(); // prevent newline when pressing enter
      props.sendMsg(message);
      setValue("");
    }
  };
  return (
    <div>
      <textarea
        placeholder="Enter your message..."
        className="chat-message"
        value={value}
        onKeyPress={(event) => handleKeyPress(event, value)}
        onChange={(event) => setValue(event.target.value)}
      ></textarea>
      <button className="send-button" onClick={(send) => props.sendMsg(value)}>
        <FontAwesomeIcon className="send-icon" icon={faMailReply} />
      </button>
    </div>
  );
};

export default ChatInput;
