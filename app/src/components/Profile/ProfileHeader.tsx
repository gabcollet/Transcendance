import { useContext, useEffect, useState } from "react";
import { fetchObject } from "./FetchValue";
import styles from "./ProfileHeader.module.css";
import { ProfileProps } from "./ProfileInterfaces";
import { UserDisplayName } from "./UserDisplayName";
import { UserImage } from "./UserImage";
import { UserLosses } from "./UserLosses";
import { UserStatus } from "./UserStatus";
import { UserWins } from "./UserWins";
import LeaderboardStyles from "../../Pages/Leaderboard.module.css";
import { FriendButton } from "./FriendButton";
import { ProfileContext } from "../../App";

export const ProfileHeader = (props: ProfileProps) => {
  const profileName = useContext(ProfileContext);
  const [stats, setStats] = useState(Object);

  useEffect(() => {
    fetchObject("profile/stats/" + props.username, setStats);
  }, [props.username]);

  let winRatio = stats.wins / stats.losses;
  let winRatioDecimal = "";
  if (!isFinite(winRatio)) {
    winRatio = 0;
  }
  winRatio = Math.round(winRatio * 100) / 100;
  winRatioDecimal = winRatio.toFixed(2);

  return (
    <section className={styles["profile-header-container"]}>
      <div className={styles["profile-id-container"]}>
        <div className={styles["id-container-info"]}>
          <UserImage
            username={props.username}
            className={styles["profile-image"]}
          />
          <UserDisplayName
            username={props.username}
            className={styles["profile-name-text"]}
          />
          <UserStatus
            username={props.username}
            className={styles["profile-status"]}
          />
        </div>
        <div className={styles["id-container-buttons"]}>
          {props.username !== profileName && (
            <>
              <FriendButton friendUsername={props.username} />
              <button>Message</button>
            </>
          )}
        </div>
      </div>
      <div className={styles["primary-stats-container"]}>
        <div className={styles["primary-stats-text-container"]}>
          <h3 className={styles["primary-stats-text"]}>Wins:</h3>
          <h3 className={styles["primary-stats-text"]}>Losses:</h3>
          <h3 className={styles["primary-stats-text"]}>Net Wins:</h3>
          <h3 className={styles["primary-stats-text"]}>Ratio:</h3>
        </div>
        <div className={styles["primary-stats-number-container"]}>
          <h3 className={styles["primary-stats-text"]}>{stats.wins}</h3>
          <h3 className={styles["primary-stats-text"]}>{stats.losses}</h3>
          <h3 className={styles["primary-stats-text"]}>{stats.netWins}</h3>
          <h3 className={styles["primary-stats-text"]}>{winRatioDecimal}</h3>
        </div>
      </div>
      <div className={styles["profile-rank-container"]}>
        <h2 className={styles["profile-rank-text"]}>Rank:</h2>
        <h2 className={styles["profile-rank-number"]}>{stats.rank}</h2>
      </div>
    </section>
  );
};
