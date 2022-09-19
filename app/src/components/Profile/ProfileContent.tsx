import { useState, useEffect } from 'react';
import styles from './ProfileContent.module.css';
import data from './data_placeholder';
import { FriendCard } from './FriendCard';
import { fetchObject, fetchText } from './FetchValue';

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

type Friendship = {
  id: number,
  sender: string,
}

const FriendsContent = () => {
  // TO DO: Function that gets list of active friends from the backend
  // TO DO: Function that gets list of pending friend request received from the backend
    const [friends, setFriends] = useState([]);
    console.log("CALLING REACT FRIEND CONTENT");
    fetchObject('users/laube/friends', setFriends);

    console.log(`This is newfriend: ${friends}`);

    const friendsElement = friends.map((friend) => {
        return (
          <FriendCard username={friend} />
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