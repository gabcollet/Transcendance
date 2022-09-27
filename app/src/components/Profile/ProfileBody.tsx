import { useState, useEffect } from "react";
import styles from "./ProfileBody.module.css";
import data from "./data_placeholder";
import { FriendCard } from "./FriendCard";
import { fetchObject, fetchText } from "./FetchValue";
import { ProfileProps, SpecificContentProps } from "./ProfileInterfaces";

export const ProfileBody = (props: ProfileProps) => {
  const [contentType, setContentType] = useState("friends");

  return (
    <section className={styles["profile-content-container"]}>
      <div className={styles["profile-selector-container"]}>
        <button
          className={`${styles["selector-friends"]} ${styles["selector-button"]}`}
          onClick={() => setContentType("friends")}
        >
          Friends
        </button>
        <button
          className={`${styles["selector-history"]} ${styles["selector-button"]}`}
          onClick={() => setContentType("history")}
        >
          History
        </button>
        <button
          className={`${styles["selector-achievements"]} ${styles["selector-button"]}`}
          onClick={() => setContentType("achievements")}
        >
          Achievements
        </button>
      </div>
      <div className={styles["specific-content"]}>
        <SpecificContent contentType={contentType} username={props.username} />
      </div>
    </section>
  );
};

const SpecificContent = (props: SpecificContentProps) => {
  if (props.contentType === "friends") {
    // THIS GETS CALLED REPEATEDLY
    return <FriendsContent username={props.username} />;
  } else if (props.contentType === "history") {
    return <HistoryContent />;
  } else if (props.contentType === "achievements") {
    return <AchievementsContent />;
  } else {
    return <h2>Nothing? WTF!?</h2>;
  }
};

const FriendsContent = (props: ProfileProps) => {
  const [friends, setFriends] = useState<any[]>([]);

  useEffect(() => {
    fetchObject("users/" + props.username + "/friends", setFriends);
  }, []);

  const friendsElement = friends?.map((friendUsername: string) => {
    return friendUsername && <FriendCard friendUsername={friendUsername} />;
  });

  return (
    <section className={styles["friends-content-container"]}>
      {friendsElement}
    </section>
  );
};

const HistoryContent = () => {
  const matchesElement = data.matches.map((match) => {
    return (
      <div className={styles["match-content-individual"]}>
        <div className={styles["match-id"]}>
          <div className={styles["me-id"]}>
            <img src={data.profile_image} alt={data.name} />
            <h4>{data.name}</h4>
          </div>
          <h3>
            {match.my_points} - {match.foe_points}
          </h3>
          <div className={styles["foe-id"]}>
            <img src={match.foe_profile_image} alt={match.opponent_name} />
            <h4>{match.opponent_name}</h4>
          </div>
        </div>
      </div>
    );
  });
  return (
    <section className={styles["history-content-container"]}>
      {matchesElement}
    </section>
  );
};

const AchievementsContent = () => {
  return (
    <section className={styles["achievements-content-container"]}>
      <p>These are the achievements.</p>
    </section>
  );
};
