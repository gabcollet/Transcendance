/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import styles from "./ProfileBody.module.css";
import data from "./data_placeholder";
import { FriendCard } from "./FriendCard";
import { fetchObject, fetchText } from "./FetchValue";
import { ProfileProps, SpecificContentProps } from "./ProfileInterfaces";
import { AchievementCard } from "./AchievementCard";
import { MatchCard } from "./MatchCard";

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
    return <HistoryContent username={props.username} />;
  } else if (props.contentType === "achievements") {
    return <AchievementsContent username={props.username} />;
  } else {
    return <h2>Nothing? WTF!?</h2>;
  }
};

const FriendsContent = (props: ProfileProps) => {
  const [friends, setFriends] = useState<any[]>([]);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);

  async function callBackRemove() {
    await fetchObject("users/" + props.username + "/friends", setFriends);
    await fetchObject(
      "users/" + props.username + "/friendrequests",
      setFriendRequests
    );
  }

  useEffect(() => {
    fetchObject("users/" + props.username + "/friends", setFriends);
    fetchObject(
      "users/" + props.username + "/friendrequests",
      setFriendRequests
    );
  }, [props.username]);

  const friendsElement = friends?.map((friendUsername: string) => {
    return (
      friendUsername && (
        <FriendCard
          key={friendUsername}
          onRemove={callBackRemove}
          friendUsername={friendUsername}
        />
      )
    );
  });

  const friendRequestsElement = friendRequests?.map(
    (friendUsername: string) => {
      return (
        friendUsername && (
          <FriendCard
            key={friendUsername}
            onRemove={callBackRemove}
            friendUsername={friendUsername}
          />
        )
      );
    }
  );

  return (
    <section className={styles["friends-content-container"]}>
      <div>
        <h3 className={styles["friendrequests-header"]}>Friend Requests</h3>
        {friendRequestsElement}
      </div>
      <div>
        <h3 className={styles["friends-header"]}>Friends</h3>
        {friendsElement}
      </div>
    </section>
  );
};

const HistoryContent = (props: ProfileProps) => {
  const [matchHistory, setMatchHistory] = useState(Object);
  const [hasFetched, setHasFetched] = useState(0);

  useEffect(() => {
    const asyncFetch = async () => {
      await fetchObject(
        "users/" + props.username + "/history",
        setMatchHistory
      );
      setHasFetched(1);
    };
    asyncFetch();
  }, [props.username]);

  let matchesElement = null;
  if (hasFetched) {
    matchesElement = matchHistory?.map((match: History, i: number) => {
      return <MatchCard key={`${i}-matchCard`} match={match} />;
    });
  }
  return (
    <section className={styles["history-content-container"]}>
      {matchesElement}
    </section>
  );
};

const AchievementsContent = (props: any) => {
  const [achievements, setAchievements] = useState(Object);

  useEffect(() => {
    fetchObject("users/" + props.username + "/achievements", setAchievements);
  }, [props.username]);

  let achievementElement: any = [];
  for (let key in achievements) {
    if (key !== "id" && key !== "username") {
      achievementElement.push(
        <AchievementCard
          key={`achievementCard-${key}`}
          name={key}
          achieved={achievements[key]}
        />
      );
    }
  }

  return (
    <section className={styles["achievements-content-container"]}>
      {achievementElement}
    </section>
  );
};
