import { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import data from './data_placeholder';

interface _Content {
    contentType: string;
}

export const ProfileBody = () => {
    const [contentType, setContentType] = useState('friends');
    
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
          <SpecificContent contentType={contentType} />
        </div>
      </section>
    );
}

const SpecificContent = (props: _Content) => {
    if (props.contentType === "friends") {
        return (
            <FriendsContent />
        );
    } else if (props.contentType === "history") {
        return (
            <HistoryContent />
        );
    } else if (props.contentType === "achievements") {
        return (
            <AchievementsContent />
        );
    } else {
        return (
            <h2>Nothing? WTF!?</h2>
        );
    }
}

const FriendsContent = () => {
    const friendsElement = data.friends.map((friend) => {
        return (
          <div className={styles["friends-content-individual"]}>
            <div className={styles["individual-id"]}>
              <img src={friend.profile_image} alt={friend.name} />
              <h4>{friend.name}</h4>
              <p>status: {friend.status}</p>
            </div>
            <div className={styles["individual-buttons"]}>
              <button>Add friend</button>
              <button>Message</button>
            </div>
            <div className={styles["individual-stats"]}>
              <h3>W: {friend.victories}</h3>
              <h3>L: {friend.defeats}</h3>
            </div>
          </div>
        );
    });
    return (
        <section className={styles["friends-content-container"]}>
            {friendsElement}
        </section>
    );
}

const HistoryContent = () => {
  const matchesElement = data.matches.map((match) => {
    return (
      <div className={styles["match-content-individual"]}>
        <div className={styles["match-id"]}>
          <div className={styles["me-id"]}>
            <img src={data.profile_image} alt={data.name} />
            <h4>{data.name}</h4>
          </div>
          <h3>{match.my_points} - {match.foe_points}</h3>
          <div className={styles["foe-id"]}>
            <img src={match.foe_profile_image} alt={match.opponent_name} />
            <h4>{match.opponent_name}</h4>
          </div>
        </div>
      </div>
    );
  });
  return (
    <section className={styles["history-content-container"]}>{matchesElement}</section>
  );
}

const AchievementsContent = () => {
    return (
        <section className={styles["achievements-content-container"]}>
            <p>These are the achievements.</p>
        </section>
    );
}