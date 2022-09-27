import { useState, useEffect } from "react";
import styles from "./ProfileBody.module.css";
import data from "./data_placeholder";
import { fetchObject } from "./FetchValue";
import { FriendCardProps } from "./ProfileInterfaces";

export const FriendCard = (props: FriendCardProps) => {
  const [friendUser, setFriendUser] = useState<any>({});

  useEffect(() => {
    fetchObject("users/" + props.friendUsername, setFriendUser);
    console.log(`friendUsername: ${props.friendUsername}`);
  }, [props.searchString, props.friendUsername]);

  return (
    <div className={styles["friends-content-individual"]}>
      <div className={styles["individual-id"]}>
        <img src={friendUser.picture} alt={friendUser.username} />
        <h4>{friendUser.username}</h4>
        <p>status: {friendUser.status}</p>
      </div>
      <div className={styles["individual-buttons"]}>
        <button>Add friend</button>
        <button>Message</button>
      </div>
      <div className={styles["individual-stats"]}>
        <h3>W: {friendUser.wins}</h3>
        <h3>L: {friendUser.losses}</h3>
      </div>
    </div>
  );
};
