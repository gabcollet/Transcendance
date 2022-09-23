import "./MessageWindow.css";
import ChatBubble from "./ChatBubble";
import { MessageWindow_ } from "../../interfaces";

const MessageWindow = (props: MessageWindow_) => {
  return (
    <div className="msg-window">
      {props.messages.map((message, index) => (
        <div>
          <ChatBubble key={index} message={message}></ChatBubble>
        </div>
      ))}
    </div>
  );
};

export default MessageWindow;
