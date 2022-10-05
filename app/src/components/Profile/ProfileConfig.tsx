import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../App";
import styles from "./ProfileConfig.module.css";
import axios from "axios";
import { fetchObject } from "./FetchValue";

export const ProfileConfig = (props: any) => {
  const profileName = useContext(ProfileContext);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState(Object);
  const [newTwoFA, setNewTwoFA] = useState(Object);
  const [profileUser, setProfileUser] = useState(Object);
  const [twoFAToggle, setTwoFAToggle] = useState(false);

  useEffect(() => {
    fetchObject("users/" + profileName, setProfileUser);
    console.log("useEffect called");
  }, [twoFAToggle, profileName]);

  const handleDisplayNameChange = (event: any) => {
    setNewDisplayName(event.target.value);
  };

  const handleNameButtonClick = async (event: any) => {
    const resp = await fetch(
      "http://localhost:3030/users/" +
        profileName +
        "/config/displayname?displayname=" +
        newDisplayName,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `bearer ${Cookies.get("jwtToken")}`,
        },
      }
    );
  };

  const handleFileSelected = async (event: any) => {
    setNewProfilePicture(event.target.files[0]);
    // const formData = new FormData();
    // formData.append("file", newProfilePicture);

    //    await fetch(
    //      "http://localhost:3030/users/" + profileName + "/config/picture",
    //      {
    //        method: "POST",
    //        credentials: "include",
    //        headers: {
    //          Authorization: `bearer ${Cookies.get("jwtToken")}`,
    //          //"Content-Type": "multipart/form-data"
    //        },
    //        body: formData,
    //      }
    //    );
  };

  const handleFileUpload = async (event: any) => {
    const formData = new FormData();
    formData.append("file", newProfilePicture);

    await fetch(
      "http://localhost:3030/users/" + profileName + "/config/picture",
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `bearer ${Cookies.get("jwtToken")}`,
          //"Content-Type": "multipart/form-data"
        },
        body: formData,
      }
    );
  };

  const handleTwoFAClick = async (event: any) => {
    await fetchObject("auth/TwoFA/toggle", setNewTwoFA);
    twoFAToggle === true ? setTwoFAToggle(false) : setTwoFAToggle(true);
  };

  return (
    <section className={styles["config-container"]}>
      <h2 className={styles["config-header"]}>User Configuration</h2>
      <div className={styles["config-displayname-container"]}>
        <h3
          className={`${styles["config-displayname-header"]} ${styles["config-subheader"]}`}
        >
          Change Display Name
        </h3>
        <div className={styles["config-name-button-container"]}>
          <input type="text" onChange={handleDisplayNameChange} />
          <button
            className={styles["config-button"]}
            onClick={handleNameButtonClick}
          >
            Change Display Name
          </button>
        </div>
      </div>
      <div className={styles["config-picture-container"]}>
        <h3
          className={`${styles["config-picture-header"]} ${styles["config-subheader"]}`}
        >
          Change Profile Picture
        </h3>
        <div className={styles["config-image-button-container"]}>
          <input type="file" onChange={handleFileSelected} />
          <button
            className={styles["config-button"]}
            onClick={handleFileUpload}
          >
            Change Profile Picture
          </button>
        </div>
      </div>
      <div className={styles["config-twofa-container"]}>
        <h3
          className={`${styles["config-twofa-header"]} ${styles["config-subheader"]}`}
        >
          Two Factor Authentication
        </h3>
        <div className={styles["config-twofa-button-container"]}>
          <button
            className={styles["config-button"]}
            onClick={handleTwoFAClick}
          >
            {profileUser.twoFAEnabled && "Deactivate Two Factor Authentication"}
            {!profileUser.twoFAEnabled && "Activate Two Factor Authentication"}
          </button>
        </div>
      </div>
    </section>
  );
};
