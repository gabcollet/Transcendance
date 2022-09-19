import "./SendButton.css";
import { SocketContext } from "../../context/socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailReply } from "@fortawesome/free-solid-svg-icons";

interface SendButton_ {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
}

const SendButton = (props: SendButton_) => {
  const sendMsg = (
    inputRef: React.MutableRefObject<HTMLInputElement | null>
  ) => {
    if (props.inputRef.current != null) {
      console.log(inputRef.current);
      //   socket.emit(inputRef.current);
    }
  };
  return (
    <button className="send-button" onClick={(send) => sendMsg(props.inputRef)}>
      <FontAwesomeIcon className="send-icon" icon={faMailReply} />
    </button>
  );
};

export default SendButton;
