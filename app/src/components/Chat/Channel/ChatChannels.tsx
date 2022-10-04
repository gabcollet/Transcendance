import styles from "./ChatChannels.module.css";
import Channel from "./Channel";
import AddChannel from "./AddChannel";
import { ChatChannels_, ChannelDB_ } from "../../../interfaces";

const ChatChannels = (props: ChatChannels_) => {
  let list: JSX.Element;
  let publicList: JSX.Element;
  if (typeof props.userChannels == "object") {
    list = props.userChannels.map((object: ChannelDB_, index: number) => {
      return (
        <Channel
          title={object.chatroom.channelName}
          id={object.chatroom.id}
          key={index}
          joined={true}
          setUserChannels={props.setUserChannels}
          setPublic={props.setPublic}
          setRoomID={props.setRoomID}
          currentID={props.currentID}
          setSocket={props.setSocket}
          socket={props.socket}
        ></Channel>
      );
    });
  } else {
    list = <></>;
  }
  if (typeof props.publicChannels == "object") {
    publicList = props.publicChannels.map((object: any, index: number) => {
      return (
        <Channel
          title={object.channelName}
          id={object.id}
          joined={false}
          setUserChannels={props.setUserChannels}
          setPublic={props.setPublic}
          setRoomID={props.setRoomID}
          currentID={props.currentID}
          setSocket={props.setSocket}
          socket={props.socket}
          key={index}
        ></Channel>
      );
    });
  } else {
    publicList = <></>;
  }
  return (
    <div className={styles["wrap"]}>
      <div className={styles["channels-wrapper"]}>
        <div className={styles["top-title"]}>Your Channels</div>
        <AddChannel
          userChannels={props.userChannels}
          setUserChannels={props.setUserChannels}
          setPublic={props.setPublic}
          publicChannels={null}
          setRoomID={props.setRoomID}
          currentID={props.currentID}
          setSocket={props.setSocket}
          socket={props.socket}
        ></AddChannel>
        {list}
      </div>
      <div className={styles["public-wrap"]}>
        <div className={styles["top-title"]}>Public Channels</div>
        {publicList}
      </div>
    </div>
  );
};

export default ChatChannels;
