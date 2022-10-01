import styles from "./ChatChannels.module.css";
import Channel from "./Channel";
import AddChannel from "./AddChannel";
import { ChatChannels_, ChannelDB_ } from "../../../interfaces";
import { useEffect } from "react";

const ChatChannels = (props: ChatChannels_) => {
  let list: JSX.Element;
  if (typeof props.userChannels == "object") {
    list = props.userChannels.map((object: ChannelDB_, index: number) => {
      return (
        <Channel
          title={object.chatroom.channelName}
          id={object.chatroom.id}
          joined={true}
          setUserChannels={props.setUserChannels}
        ></Channel>
      );
    });
  } else {
    list = <></>;
  }
  return (
    <div className={styles["wrap"]}>
      <div className={styles["channels-wrapper"]}>
        <div className={styles["top-title"]}>Your Channels</div>
        <AddChannel
          userChannels={props.userChannels}
          setUserChannels={props.setUserChannels}
        ></AddChannel>
        {list}
      </div>
      <div className={styles["public-wrap"]}>
        <div className={styles["top-title"]}>Public Channels</div>
        <Channel
          title="test3"
          id={-1}
          joined={false}
          setUserChannels={props.setUserChannels}
        ></Channel>
      </div>
    </div>
  );
};

export default ChatChannels;
