import "./ChatInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailReply } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ChatInput_ } from "../../interfaces";

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
    <div className="input-wrapper">
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
