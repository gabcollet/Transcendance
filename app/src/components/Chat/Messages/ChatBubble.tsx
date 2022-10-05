import styles from "./ChatBubble.module.css";
import { ChatBubble_ } from "../../../interfaces";
import { ProfileContext } from "../../../App";
import { useContext } from "react";

const ChatBubble = (props: ChatBubble_) => {
  let i = 0;
  let to_send = <p></p>;
  const profileName = useContext(ProfileContext);
  let author = "";
  if (props.author === profileName) {
    author = "Me";
  } else {
    author = props.author;
  }
  if (props.author !== profileName) {
    to_send = (
      <div className={styles["message"]}>
        <p className={styles["bubble-sent"]}>{props.message + "\n"}</p>
        <div className={styles["sent-by"]}>Sent by {props.author}</div>
      </div>
    );
  } else {
    to_send = (
      <div className={styles["message"]}>
        <p className={styles["bubble-received"]}>{props.message + "\n"}</p>
        <div className={styles["sent-by"]}>Sent by Me</div>
      </div>
    );
    i++;
  }

  return <div className={styles["bubble-wrap"]}>{to_send}</div>;
};

export default ChatBubble;
