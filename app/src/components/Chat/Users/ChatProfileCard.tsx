import { useEffect, useState } from "react";
import { Username_ } from "../../../interfaces";
import { fetchObject } from "../../Profile/FetchValue";
import { User } from "../../Profile/ProfileInterfaces";
import { UserImage } from "../../Profile/UserImage";
import ChatCardStyle from "./ChatProfileCard.module.css";

// Takes in "username" as props, which is the username of the user
export const ChatProfileCard = (props: Username_) => {
  const [chatUser, setChatUser] = useState<User>({});

  useEffect(() => {
    fetchObject("users/" + props.username, setChatUser);
  }, [props.username]);

  return (
    <div className={ChatCardStyle["chat-card-container"]}>
      <div className={ChatCardStyle["profile-picture-container"]}>
        <UserImage username={props.username} />
      </div>
      <div className={ChatCardStyle["profile-info-container"]}>
        <h4 className={ChatCardStyle["profile-name"]}>
          {chatUser.displayname}
        </h4>
        <p className={ChatCardStyle["profile-status"]}>{chatUser.status}</p>
      </div>
    </div>
  );
};
