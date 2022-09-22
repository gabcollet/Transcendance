import "./ChatChannels.css";
import Channel from "./Channel";

const ChatChannels = () => {
  return (
    <div className="channels-wrapper">
      <div className="top-title">Channels</div>
      <Channel></Channel>
      <Channel></Channel>
      <Channel></Channel>
      <Channel></Channel>
    </div>
  );
};

export default ChatChannels;
