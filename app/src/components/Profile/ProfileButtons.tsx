import { Link } from "react-router-dom";
import styles from "./ProfileButtons.module.css";

export const ProfileButtons = () => {
  return (
    <div className={styles["path-buttons-container"]}>
      <Link className={styles["search-link"]} to="/Profile/user">
        <button className={styles["profile-buttons"]} type="button">
          User
        </button>
      </Link>
      <Link className={styles["search-link"]} to="/Profile/search">
        <button className={styles["profile-buttons"]} type="button">
          Search
        </button>
      </Link>
      <Link className={styles["search-link"]} to="/Profile/config">
        <button className={styles["profile-buttons"]} type="button">
          Config
        </button>
      </Link>
    </div>
  );
};
