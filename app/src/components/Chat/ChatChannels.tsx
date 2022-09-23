import "./ChatChannels.css";
import Channel from "./Channel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddChannel from "./AddChannel";
import { useState } from "react";
import { ChatChannels_ } from "../../interfaces";

const ChatChannels = (props: ChatChannels_) => {
  const [joined, setJoined] = useState<boolean>(false);
  return (
    <div className="wrap">
      <div className="channels-wrapper">
        <div className="top-title">Your Channels</div>
        <AddChannel></AddChannel>
        <Channel title="test" joined={true}></Channel>
      </div>
      <div className="public-wrap">
        <div className="top-title">Public Channels</div>
        <Channel title="test" joined={false}></Channel>
      </div>
    </div>
  );
};

export default ChatChannels;
