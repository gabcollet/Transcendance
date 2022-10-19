/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { fetchText } from "./FetchValue";
import FriendCardStyle from "./FriendCard.module.css";

export const BlockUser = (props: any) => {
  const [blockedUser, setBlockedUser] = useState("");

  const blockUser = async () => {
    fetchText("users/" + props.otherUsername + "/block", setBlockedUser);
  };

  return (
    <button
      className={`${FriendCardStyle["block-button"]} ${FriendCardStyle["button-78"]}`}
      onClick={blockUser}
    >
      Block User
    </button>
  );
};
