import styles from "./Profile.module.css";
import { ProfileHeader } from "../components/Profile/ProfileHeader";
import { ProfileBody } from "../components/Profile/ProfileBody";
import { useParams } from "react-router-dom";
import { ProfileProps } from "../components/Profile/ProfileInterfaces";
import { ProfileButtons } from "../components/Profile/ProfileButtons";

export const ProfileContent = (props: ProfileProps) => {
  let usedUsername = props.username;
  let { username } = useParams();
  if (username) {
    usedUsername = username;
  }
  return (
    <div className={styles["profile-page-container"]}>
      <ProfileButtons />

      <section className={styles["profile-sub-container"]}>
        {props.username !== "" && <ProfileHeader username={usedUsername} />}
        {props.username !== "" && <ProfileBody username={usedUsername} />}
      </section>
    </div>
  );
};
