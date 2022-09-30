import styles from "./ChatChannels.module.css";
import Channel from "./Channel";
import AddChannel from "./AddChannel";
import { ChatChannels_, ChannelDB_ } from "../../../interfaces";
import { useEffect } from "react";

const ChatChannels = (props: ChatChannels_) => {
  let list;
  if (typeof props.userChannels == "object") {
    list = props.userChannels.map((object: ChannelDB_, index: number) => {
      return <Channel title={object.channelName} joined={true}></Channel>;
    });
  } else {
    list = <></>;
  }
  return (
    <div className={styles["wrap"]}>
      <div className={styles["channels-wrapper"]}>
        <div className={styles["top-title"]}>Your Channels</div>
        <AddChannel></AddChannel>
        {list}
      </div>
      <div className={styles["public-wrap"]}>
        <div className={styles["top-title"]}>Public Channels</div>
        <Channel title="test3" joined={false}></Channel>
      </div>
    </div>
  );
};

export default ChatChannels;
