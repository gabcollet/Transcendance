import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { ProfileContext } from "../../App";
import styles from "./ProfileConfig.module.css";
import axios from "axios";

export const ProfileConfig = (props: any) => {
  const profileName = useContext(ProfileContext);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState(Object);

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

  return (
    <section>
      <h2 className={styles["config-header"]}>User Configuration</h2>
      <div className={styles["config-displayname"]}>
        <h3
          className={`${styles["config-displayname-header"]} ${styles["config-subheader"]}`}
        >
          Change Display Name
        </h3>
        <button onClick={handleNameButtonClick}>Change Display Name</button>
        <input type="text" onChange={handleDisplayNameChange} />
      </div>
      <div className={styles["config-picture"]}>
        <h3
          className={`${styles["config-picture-header"]} ${styles["config-subheader"]}`}
        >
          Change Profile Picture
        </h3>
        <input type="file" onChange={handleFileSelected} />
        <button onClick={handleFileUpload}>Upload File</button>
      </div>
      <div className={styles["config-twofa"]}>
        <h3
          className={`${styles["config-twofa-header"]} ${styles["config-subheader"]}`}
        >
          Two Factor Authentication
        </h3>
      </div>
    </section>
  );
};
