import "./SendButton.css";
import { SocketContext } from "../../context/socket";

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
    <button className="send" onClick={(send) => sendMsg(props.inputRef)}>
      Send
    </button>
  );
};

export default SendButton;
