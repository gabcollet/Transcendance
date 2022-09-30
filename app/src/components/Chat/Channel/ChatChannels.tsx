import styles from "./ChatChannels.module.css";
import Channel from "./Channel";
import AddChannel from "./AddChannel";
import { ChatChannels_ } from "../../../interfaces";

const ChatChannels = (props: ChatChannels_) => {
  return (
    <div className={styles["wrap"]}>
      <div className={styles["channels-wrapper"]}>
        <div className={styles["top-title"]}>Your Channels</div>
        <AddChannel></AddChannel>
        <Channel title="test1" joined={true}></Channel>
        <Channel title="test2" joined={true}></Channel>
        <Channel title="test1" joined={true}></Channel>
        <Channel title="test2" joined={true}></Channel>
        <Channel title="test1" joined={true}></Channel>
        <Channel title="test2" joined={true}></Channel>
        <Channel title="test1" joined={true}></Channel>
        <Channel title="test2" joined={true}></Channel>
        <Channel title="test1" joined={true}></Channel>
        <Channel title="test2" joined={true}></Channel>
        <Channel title="test1" joined={true}></Channel>
        <Channel title="test2" joined={true}></Channel>
      </div>
      <div className={styles["public-wrap"]}>
        <div className={styles["top-title"]}>Public Channels</div>
        <Channel title="test3" joined={false}></Channel>
      </div>
    </div>
  );
};

export default ChatChannels;
