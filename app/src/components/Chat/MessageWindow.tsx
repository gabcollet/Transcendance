import "./MessageWindow.css";

interface MessageWindow_ {
  messages: string[];
}

const MessageWindow = (props: MessageWindow_) => {
  console.log(props.messages);
  return (
    <div className="msg-window">
      {props.messages.map((message, index) => (
        <div key={index}>{message + "\n"}</div>
      ))}
    </div>
  );
};

export default MessageWindow;
