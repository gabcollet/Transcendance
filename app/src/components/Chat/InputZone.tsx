import ChatInput from "./ChatInput";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

interface InputZone_ {
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
  messages: string[];
}

const InputZone = (props: InputZone_) => {
  const [socket, setSocket] = useState<Socket>();

  const messageListener = (message: string) => {
    props.setMessages([...props.messages, message]);
  };
  useEffect(() => {
    socket?.on("message", messageListener);
    return () => {
      socket?.off("message", messageListener);
    };
  }, [messageListener]);
  const sendMsg = (message: string) => {
    if (message != "") {
      console.log(message);
      socket?.emit("message", message);
    }
  };
  useEffect(() => {
    const newSocket = io("localhost:6005");
    setSocket(newSocket);
    console.log("Chat socket set");
  }, [setSocket]); //pas certain de comprendre pourquoi il doit dependre de setSocket

  return (
    <div className="type-zone">
      <ChatInput sendMsg={sendMsg}></ChatInput>
    </div>
  );
};

export default InputZone;
