import styles from "./ChatChannels.module.css";
import Channel from "./Channel";
import AddChannel from "./AddChannel";
import { ChatChannels_, ChannelDB_ } from "../../../interfaces";
import { useState } from "react";
import OwnerPopup from "./OwnerPopup";

const ChatChannels = (props: ChatChannels_) => {
  let list: JSX.Element;
  let publicList: JSX.Element;
  const [popPassword, setPopPassword] = useState(false);
  const [passwordID, setPasswordID] = useState(0);
  const [ownerTrigger, setOwnerTrigger] = useState(false);

  if (typeof props.userChannels == "object") {
    list = props.userChannels.map((object: ChannelDB_, index: number) => {
      return (
        <div key={index}>
          <OwnerPopup
            trigger={ownerTrigger}
            setTrigger={setOwnerTrigger}
            channelID={object.chatroom.id}
          ></OwnerPopup>
          <Channel
            title={object.chatroom.channelName}
            id={object.chatroom.id}
            joined={true}
            setUserChannels={props.setUserChannels}
            setPublic={props.setPublic}
            setRoomID={props.setRoomID}
            currentID={props.currentID}
            setSocket={props.setSocket}
            socket={props.socket}
            setPasswordTrigger={setPopPassword}
            setPasswordID={setPasswordID}
            key={index}
            isDM={object.chatroom.isDM}
            ownerTrigger={ownerTrigger}
            setOwnerTrigger={setOwnerTrigger}
            setMembers={props.setMembers}
          ></Channel>
        </div>
      );
    });
  } else {
    list = <></>;
  }
  if (typeof props.publicChannels == "object") {
    publicList = props.publicChannels.map((object: any, index: number) => {
      return (
        <div key={index}>
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
            setPasswordTrigger={setPopPassword}
            setPasswordID={setPasswordID}
            isDM={false}
            ownerTrigger={ownerTrigger}
            setOwnerTrigger={setOwnerTrigger}
            setMembers={props.setMembers}
          ></Channel>
        </div>
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
          setPasswordTrigger={setPopPassword}
          passwordTrigger={popPassword}
          passwordID={passwordID}
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
