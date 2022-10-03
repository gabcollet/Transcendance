import styles from "./ChatInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailReply } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ChatInput_ } from "../../../interfaces";

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
  const handleClick = (message: string) => {
    console.log("On click ?");
    props.sendMsg(value);
    setValue("");
  };
  return (
    <div className={styles["input-wrapper"]}>
      <textarea
        placeholder="Enter your message..."
        className={styles["chat-message"]}
        value={value}
        onKeyPress={(event) => handleKeyPress(event, value)}
        onChange={(event) => setValue(event.target.value)}
      ></textarea>
      <button
        className={styles["send-button"]}
        onClick={(send) => handleClick(value)}
      >
        <FontAwesomeIcon className={styles["send-icon"]} icon={faMailReply} />
      </button>
    </div>
  );
};

export default ChatInput;
