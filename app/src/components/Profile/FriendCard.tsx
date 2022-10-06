import { useState, useEffect, useContext } from "react";
import ProfileBodyStyle from "./ProfileBody.module.css";
import FriendCardStyle from "./FriendCard.module.css";
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
import { UserImage } from "./UserImage";

const FriendButton = (props: FriendButtonProps) => {
  const profileName = useContext(ProfileContext);
  const [friendStatus, setFriendStatus] = useState("1");

  useEffect(() => {
    async function fetchAsync() {
      await fetchText(
        "users/" +
          profileName +
          "/friendstatus" +
          "?username=" +
          props.friendUsername,
        setFriendStatus
      );
    }
    fetchAsync();
  }, [props.friendUsername, friendStatus]);

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
    return (
      <button
        className={`${FriendCardStyle["friend-button"]} ${FriendCardStyle["button-65"]}`}
        onClick={addFriend}
      >
        Add friend
      </button>
    );
  } else if (friendStatus === "1") {
    return (
      <button
        className={`${FriendCardStyle["friend-button"]} ${FriendCardStyle["button-65"]}`}
        onClick={cancelRequest}
      >
        Cancel friend request
      </button>
    );
  } else if (friendStatus === "2") {
    return (
      <button
        className={`${FriendCardStyle["friend-button"]} ${FriendCardStyle["button-65"]}`}
        onClick={addFriend}
      >
        Accept <br></br>friend request
      </button>
    );
  } else {
    return (
      <button
        className={`${FriendCardStyle["friend-button"]} ${FriendCardStyle["button-65"]}`}
        onClick={removeFriend}
      >
        Remove friend
      </button>
    );
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
    <div className={ProfileBodyStyle["friends-content-individual"]}>
      <div className={ProfileBodyStyle["individual-id"]}>
        {/* <img src={friendUser.picture} alt={friendUser.username} /> */}
        <UserImage username={props.friendUsername} />
        <h4 className={FriendCardStyle["friend-name"]}>
          {friendUser.displayname}
        </h4>
        <p>status: {friendUser.status}</p>
      </div>
      <div className={ProfileBodyStyle["individual-buttons"]}>
        <FriendButton
          onRemove={props.onRemove}
          friendUsername={friendUser.username}
        />
        <button
          className={`${FriendCardStyle["friend-button"]} ${FriendCardStyle["button-65"]}`}
        >
          Message
        </button>
      </div>
      <div className={ProfileBodyStyle["individual-stats"]}>
        <h3>W: {userStats.wins}</h3>
        <h3>L: {userStats.losses}</h3>
      </div>
    </div>
  );
};
