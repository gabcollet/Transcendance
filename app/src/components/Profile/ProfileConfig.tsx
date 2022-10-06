import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../App";
import styles from "./ProfileConfig.module.css";
import ProfileStyles from "../../Pages/Profile.module.css";

import axios from "axios";
import { fetchObject } from "./FetchValue";
import { ProfileButtons } from "./ProfileButtons";

export const ProfileConfig = (props: any) => {
  const profileName = useContext(ProfileContext);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState("");
  const [newTwoFA, setNewTwoFA] = useState(Object);
  const [profileUser, setProfileUser] = useState(Object);
  const [twoFAToggle, setTwoFAToggle] = useState(false);
  const [displayErrorMessage, setDisplayErrorMessage] = useState("");
  const [imageErrorMessage, setImageErrorMessage] = useState("");

  const twoMB = 2097152;

  useEffect(() => {
    fetchObject("users/" + profileName, setProfileUser);
  }, [twoFAToggle, profileName]);

  const handleDisplayNameChange = (event: any) => {
    setNewDisplayName(event.target.value);
  };

  const handleNameButtonClick = async (event: any) => {
    if (newDisplayName.length > 15) {
      setDisplayErrorMessage(
        "ERROR: Display name cannot be over 15 characters long."
      );
      return;
    } else if (newDisplayName.length < 5) {
      setDisplayErrorMessage(
        "ERROR: Display name cannot be under 5 characters long."
      );
      return;
    } else if (!newDisplayName.match(/^[a-z0-9]+$/i)) {
      setDisplayErrorMessage(
        "ERROR: Display name can only contain alphanumeric characters."
      );
      return;
    }
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
    const data = await resp.json();
    if (data.code === "P2002") {
      setDisplayErrorMessage("ERROR: This display name is already taken.");
    } else {
      setDisplayErrorMessage(`Your display name is now: ${newDisplayName}`);
    }
  };

  const handleFileSelected = async (event: any) => {
    if (event.target.files[0].size > twoMB) {
      console.log(`image size: ${event.target.files[0].size}`);
      setImageErrorMessage("ERROR: Image should be smaller than 2MB");
      event.target.files[0].value = "";
      setNewProfilePicture("");
      return;
    }
    setImageErrorMessage(`Image is selected and ready to be updated.`);
    setNewProfilePicture(event.target.files[0]);
  };

  const handleFileUpload = async (event: any) => {
    if (!newProfilePicture) {
      setImageErrorMessage("ERROR: No image was selected");
      return;
    }
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
    <div className={ProfileStyles["profile-page-container"]}>
      <ProfileButtons />
      <div className={ProfileStyles["profile-sub-container"]}>
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
            <div className={styles["error-message-container"]}>
              <p className={styles["error-message"]}>{displayErrorMessage}</p>
            </div>
          </div>
          <div className={styles["config-picture-container"]}>
            <h3
              className={`${styles["config-picture-header"]} ${styles["config-subheader"]}`}
            >
              Change Profile Picture
            </h3>
            <div className={styles["config-image-button-container"]}>
              <label htmlFor="image-select">Browse Image</label>
              <input
                id="image-select"
                type="file"
                accept="image/*"
                onChange={handleFileSelected}
              />
              <button
                className={`${styles["config-button"]} ${styles["image-update-button"]}`}
                onClick={handleFileUpload}
              >
                Update Profile Picture
              </button>
            </div>
            <div className={styles["error-message-container"]}>
              <p className={styles["error-message"]}>{imageErrorMessage}</p>
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
                {profileUser.twoFAEnabled &&
                  "Deactivate Two Factor Authentication"}
                {!profileUser.twoFAEnabled &&
                  "Activate Two Factor Authentication"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
