import styles from "./MessageWindow.module.css";
import ChatBubble from "./ChatBubble";
import { MessageWindow_ } from "../../../interfaces";
import axios from "axios";

const MessageWindow = (props: MessageWindow_) => {
  axios
    .get("http://localhost:3030/chat/convo", {
      params: {
        username: "mafortin",
        roomId: 0,
      },
    })
    .then((response) => {});
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
