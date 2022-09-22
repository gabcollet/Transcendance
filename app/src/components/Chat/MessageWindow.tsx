import "./MessageWindow.css";
import ChatBubble from "./ChatBubble";
interface MessageWindow_ {
  messages: string[];
}

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
