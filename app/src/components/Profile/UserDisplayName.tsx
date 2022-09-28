import { useState } from "react";
import { fetchText } from "./FetchValue";
import { FetchedComponentProps } from "./ProfileInterfaces";

/*
 ** Must be passed the following props:
 ** userName: The 42 username of the profile which we fetch
 ** className: The css module class for styling purposes
 */
export const UserDisplayName = (props: FetchedComponentProps) => {
  const [displayName, setDisplayName] = useState("");
  fetchText("users/" + props.username + "/displayname", setDisplayName);
  return <p className={props.className}>{displayName}</p>;
};
