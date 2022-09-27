import { useState, useEffect, useContext } from "react";
import styles from "./ProfileBody.module.css";
import data from "./data_placeholder";
import { fetchObject, fetchText } from "./FetchValue";
import { FriendCardProps, User } from "./ProfileInterfaces";
import { ProfileContext } from "../../App";

const FriendButton = (props: any) => {
  const profileName = useContext(ProfileContext);
  const [friendStatus, setFriendStatus] = useState("0");

  useEffect(() => {
    fetchText(
      "users/" +
        profileName +
        "/friendstatus" +
        "?username=" +
        props.friendUsername,
      setFriendStatus
    );
  }, [profileName, props.friendUsername]);

  if (friendStatus === "0") {
    return <button>Add friend</button>;
  } else if (friendStatus === "1") {
    return <button>Cancel friend request</button>;
  } else if (friendStatus === "2") {
    return <button>Accept friend request</button>;
  } else {
    return <button>Remove friend</button>;
  }
};

export const FriendCard = (props: FriendCardProps) => {
  const [friendUser, setFriendUser] = useState<User>({});

  useEffect(() => {
    fetchObject("users/" + props.friendUsername, setFriendUser);
  }, [props.searchString, props.friendUsername]);

  return (
    <div className={styles["friends-content-individual"]}>
      <div className={styles["individual-id"]}>
        <img src={friendUser.picture} alt={friendUser.username} />
        <h4>{friendUser.displayname}</h4>
        <p>status: {friendUser.status}</p>
      </div>
      <div className={styles["individual-buttons"]}>
        <FriendButton friendUsername={friendUser.username} />
        {/* <button>Add friend</button> */}
        <button>Message</button>
      </div>
      <div className={styles["individual-stats"]}>
        <h3>W: {friendUser.wins}</h3>
        <h3>L: {friendUser.losses}</h3>
      </div>
    </div>
  );
};
