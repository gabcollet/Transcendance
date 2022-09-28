import { useState } from "react";
import { fetchText } from "./FetchValue";
import { FetchedComponentProps } from "./ProfileInterfaces";

/*
 ** Must be passed the following props:
 ** - username: The 42 username of the profile which we fetch.
 ** - className: The css module class for styling purposes.
 */
export const UserStatus = (props: FetchedComponentProps) => {
  const [status, setStatus] = useState("");
  fetchText("users/" + props.username + "/status", setStatus);
  return <p className={props.className}>Status: {status}</p>;
};
