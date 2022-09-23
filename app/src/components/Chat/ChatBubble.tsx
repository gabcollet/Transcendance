import "./ChatBubble.css";
import { ChatBubble_ } from "../../interfaces";

let i = 0;

const ChatBubble = (props: ChatBubble_) => {
  let to_send = <p></p>;
  if (i % 2 === 0) {
    to_send = (
      <div className="message">
        <p className="bubble-sent">{props.message + "\n"}</p>
        <div className="sent-by">Sent by You</div>
      </div>
    );
    i++;
  } else {
    to_send = (
      <div className="message">
        <p className="bubble-received">{props.message + "\n"}</p>
        <div className="sent-by">Sent by Me</div>
      </div>
    );
    i++;
  }

  return <div className="bubble-wrap">{to_send}</div>;
};

export default ChatBubble;
