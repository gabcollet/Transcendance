import styles from "./Members.module.css";
import ChatFriend from "./ChatFriend";
import { ChatFriendList_ } from "../../../interfaces";
import { ChatProfileCard } from "./ChatProfileCard";
import { useState } from "react";

const ChatFriendsList = (props: ChatFriendList_) => {
  const [trigger, setTrigger] = useState(false);
  const list = props.friends.map((member: any, index: number) => {
    return (
      <ChatProfileCard
        key={index}
        username={member}
        member={false}
        admin={false}
        setTrigger={setTrigger}
        trigger={trigger}
        channelTrigger={props.channelTrigger}
      ></ChatProfileCard>
    );
  });
  return (
    <div className={styles["friendsWrapper"]}>
      <div className={styles["top-title"]}>Friends</div>
      <ChatFriend></ChatFriend>

      {list}
    </div>
  );
};

export default ChatFriendsList;
