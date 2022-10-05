import { useState } from "react";
import { fetchText } from "./FetchValue";
import { FetchedComponentProps } from "./ProfileInterfaces";
import { ProfileContent } from "../../Pages/Profile";
import { useNavigate } from "react-router-dom";

/*
 ** Must be passed the following props:
 ** username: The 42 username of the profile which we fetch
 ** className: The css module class for styling purposes
 */

export const UserImage = (props: FetchedComponentProps) => {
  const [userImage, setUserImage] = useState("");
  const navigate = useNavigate();

  const navigateToUser = () => {
    navigate("/Profile/user/" + props.username);
  };

  if (props.username === "") {
    return (
      // <img className={props.className} src={""} alt="" />
      <></>
    );
  }
  fetchText("users/" + props.username + "/img", setUserImage);
  return (
    <img
      onClick={navigateToUser}
      className={props.className}
      src={userImage}
      alt=""
    />
  );
};
