import { useState, useEffect, useContext } from "react";
import styles from "./ProfileBody.module.css";
import data from "./data_placeholder";
import { fetchObject, fetchText } from "./FetchValue";
import {
  FriendButtonProps,
  FriendCardProps,
  Stats,
  User,
} from "./ProfileInterfaces";
import { ProfileContext } from "../../App";
import Cookies from "js-cookie";

const FriendButton = (props: FriendButtonProps) => {
  const profileName = useContext(ProfileContext);
  const [friendStatus, setFriendStatus] = useState("1");

  useEffect(() => {
    console.log("before fetch");
    const fetchData = async () => {
      await fetchText(
        "users/" +
          profileName +
          "/friendstatus" +
          "?username=" +
          props.friendUsername,
        setFriendStatus
      );
      console.log("just in-after fetch");
    };
    fetchData();
    console.log("friendUsername below");
    console.log(props.friendUsername);
    console.log(`status in useEffect: ${friendStatus}`);
  }, [props.friendUsername]);

  async function addFriend() {
    const resp = await fetch(
      "http://localhost:3030/users/" +
        profileName +
        "/addfriend?username=" +
        props.friendUsername,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `bearer ${Cookies.get("jwtToken")}`,
        },
      }
    );
    if (friendStatus === "0") {
      setFriendStatus("1");
    } else if (friendStatus === "2") {
      if (props.onRemove) {
        props.onRemove();
      }
      setFriendStatus("3");
    }
  }

  async function cancelRequest() {
    const resp = await fetch(
      "http://localhost:3030/users/" +
        profileName +
        "/cancelrequest?username=" +
        props.friendUsername,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `bearer ${Cookies.get("jwtToken")}`,
        },
      }
    );
    setFriendStatus("0");
  }

  async function removeFriend() {
    const resp = await fetch(
      "http://localhost:3030/users/" +
        profileName +
        "/removefriend?username=" +
        props.friendUsername,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `bearer ${Cookies.get("jwtToken")}`,
        },
      }
    );
    setFriendStatus("0");
    if (props.onRemove) {
      await props.onRemove();
    }
  }

  if (friendStatus === "0") {
    return <button onClick={addFriend}>Add friend</button>;
  } else if (friendStatus === "1") {
    return <button onClick={cancelRequest}>Cancel friend request</button>;
  } else if (friendStatus === "2") {
    return <button onClick={addFriend}>Accept friend request</button>;
  } else {
    return <button onClick={removeFriend}>Remove friend</button>;
  }
};

export const FriendCard = (props: FriendCardProps) => {
  const [friendUser, setFriendUser] = useState<User>({});
  const [userStats, setUserStats] = useState<Stats>({});

  useEffect(() => {
    fetchObject("users/" + props.friendUsername, setFriendUser);
    fetchObject("users/" + props.friendUsername + "/stats", setUserStats);
  }, [props.searchString, props.friendUsername]);

  return (
    <div className={styles["friends-content-individual"]}>
      <div className={styles["individual-id"]}>
        <img src={friendUser.picture} alt={friendUser.username} />
        <h4>{friendUser.displayname}</h4>
        <p>status: {friendUser.status}</p>
      </div>
      <div className={styles["individual-buttons"]}>
        <FriendButton
          onRemove={props.onRemove}
          friendUsername={friendUser.username}
        />
        <button>Message</button>
      </div>
      <div className={styles["individual-stats"]}>
        <h3>W: {userStats.wins}</h3>
        <h3>L: {userStats.losses}</h3>
      </div>
    </div>
  );
};
