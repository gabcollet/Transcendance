import { useState } from "react";
import { fetchText } from "./FetchValue";
import { FetchedComponentProps } from "./ProfileInterfaces";

/*
 ** Must be passed the following props:
 ** username: The 42 username of the profile which we fetch
 ** className: The css module class for styling purposes
 */
export const UserLosses = (props: FetchedComponentProps) => {
  const [userLosses, setUserLosses] = useState("");
  fetchText("users/" + props.username + "/losses", setUserLosses);
  return <h3 className={props.className}>L: {userLosses}</h3>;
};
