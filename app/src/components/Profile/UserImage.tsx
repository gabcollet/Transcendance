import { useState } from "react";
import { fetchText } from "./FetchValue";
import { FetchedComponentProps } from "./ProfileInterfaces";

/*
 ** Must be passed the following props:
 ** username: The 42 username of the profile which we fetch
 ** className: The css module class for styling purposes
 */
export const UserImage = (props: FetchedComponentProps) => {
  const [userImage, setUserImage] = useState("");
  if (props.username === "") {
    return <img className={props.className} src={''} alt="" />;
  }
  fetchText("users/" + props.username + "/img", setUserImage);
  return <img className={props.className} src={userImage} alt="" />;
};
