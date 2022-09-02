import "./ChatInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailReply } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

// https://stackoverflow.com/questions/47809282/submit-a-form-when-enter-is-pressed-in-a-textarea-in-react
// FOR ENTER KEY PRESS

interface ChatInput_ {}
const ChatInput = () => {
  return (
    <div>
      <textarea
        placeholder="Enter your message..."
        className="chat-message"
      ></textarea>
      <div className="send-button">
        <FontAwesomeIcon className="send-icon" icon={faMailReply} />
      </div>
    </div>
  );
};

export default ChatInput;
