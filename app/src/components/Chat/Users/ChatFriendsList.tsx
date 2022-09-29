import styles from "./ChatFriendsList.module.css";
import ChatFriend from "./ChatFriend";

const ChatFriendsList = () => {
  return (
    <div className={styles["list-wrapper"]}>
      <p>Friend List</p>
      <ChatFriend></ChatFriend>
    </div>
  );
};

export default ChatFriendsList;
