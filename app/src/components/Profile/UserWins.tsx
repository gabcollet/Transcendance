import { useState } from "react";
import { fetchText } from "./FetchValue";
import { FetchedComponentProps } from "./ProfileInterfaces";

/*
 ** Must be passed the following props:
 ** username: The 42 username of the profile which we fetch
 ** className: The css module class for styling purposes
 */
export const UserWins = (props: FetchedComponentProps) => {
  const [userWins, setUserWins] = useState("");
  fetchText("users/" + props.username + "/wins", setUserWins);
  return <h3 className={props.className}>W: {userWins}</h3>;
};
