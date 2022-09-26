import styles from "./MessageWindow.module.css";
import ChatBubble from "./ChatBubble";
import { MessageWindow_ } from "../../interfaces";

const MessageWindow = (props: MessageWindow_) => {
  return (
    <div className={styles["msg-window"]}>
      {props.messages.map((message, index) => (
        <div>
          <ChatBubble key={index} message={message}></ChatBubble>
        </div>
      ))}
    </div>
  );
};

export default MessageWindow;
