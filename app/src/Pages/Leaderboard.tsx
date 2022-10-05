import { useEffect, useState } from "react";
import { fetchObject } from "../components/Profile/FetchValue";
import { UserImage } from "../components/Profile/UserImage";
import LeaderboardStyles from "./Leaderboard.module.css";

export const TopTenCard = (props: any) => {
  const [rankNumber, setRankNumber] = useState(0);

  useEffect(() => {
    fetchObject(
  });

  let winRatio = props.player.wins / props.player.losses;
  let winRatioDecimal = "";
  if (!isFinite(winRatio)) {
    winRatio = 0;
  }
  winRatio = Math.round(winRatio * 100) / 100;
  winRatioDecimal = winRatio.toFixed(2);
  console.log(`This is win ratio: ${winRatio}`);

  return (
    <div className={LeaderboardStyles["player-container"]}>
      <div className={LeaderboardStyles["player-picture-container"]}>
        <UserImage
          username={props.player.username}
          className={LeaderboardStyles["player-picture"]}
        />
        <h2 className={LeaderboardStyles["player-name"]}>
          {props.player.username}
        </h2>
      </div>
      <div className={LeaderboardStyles["player-stats-container"]}>
        <div className={LeaderboardStyles["player-stats-text-container"]}>
          <h3 className={LeaderboardStyles["player-stats-text"]}>Wins:</h3>
          <h3 className={LeaderboardStyles["player-stats-text"]}>Losses:</h3>
          <h3 className={LeaderboardStyles["player-stats-text"]}>Net Wins:</h3>
          <h3 className={LeaderboardStyles["player-stats-text"]}>Ratio:</h3>
        </div>
        <div className={LeaderboardStyles["player-stats-number-container"]}>
          <h3 className={LeaderboardStyles["player-stats-text"]}>
            {props.player.wins}
          </h3>
          <h3 className={LeaderboardStyles["player-stats-text"]}>
            {props.player.losses}
          </h3>
          <h3 className={LeaderboardStyles["player-stats-text"]}>
            {props.player.netWins}
          </h3>
          <h3 className={LeaderboardStyles["player-stats-text"]}>
            {winRatioDecimal}
          </h3>
        </div>
      </div>
      <div className={LeaderboardStyles["player-rank-container"]}>
        <h2 className={LeaderboardStyles["player-rank-text"]}>Rank:</h2>
        <h2 className={LeaderboardStyles["player-rank-number"]}>
          {rankNumber}
        </h2>
      </div>
    </div>
  );
};

export const TopTenElements = () => {
  const [topTenPlayers, setTopTenPlayers] = useState([]);

  useEffect(() => {
    fetchObject("profile/leaderboard", setTopTenPlayers);
  }, []);

  //TODO: fetch top 10 players from backend in topTenPlayers state

  let topTenArray: any = [];
  if (topTenPlayers.length !== 0) {
    topTenArray = topTenPlayers.map((player) => {
      console.log(player);
      return <TopTenCard player={player} />;
    });
  }
  return (
    <div className={LeaderboardStyles["leaderboard-top-ten"]}>
      {topTenArray}
    </div>
  );
};

export const Leaderboard = () => {
  return (
    <div className={LeaderboardStyles["leaderboard-container"]}>
      <h2 className={LeaderboardStyles["leaderboard-header"]}>Leaderboard</h2>
      <section className={LeaderboardStyles["leaderboard-members-container"]}>
        <TopTenElements />
        <div className={LeaderboardStyles["leaderboard-profile"]}></div>
      </section>
    </div>
  );
};
