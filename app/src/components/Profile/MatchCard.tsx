import { useState, useEffect, useContext } from "react";
import MatchCardStyle from "./MatchCard.module.css";
import { fetchObject, fetchText } from "./FetchValue";
import { ProfileContext } from "../../App";

export const MatchCard = (props: any) => {
  const profileName = useContext(ProfileContext);

  const [winnerUser, setWinnerUser] = useState(Object);
  const [loserUser, setLoserUser] = useState(Object);

  useEffect(() => {
    fetchObject("users/" + props.match.winner, setWinnerUser);
    fetchObject("users/" + props.match.loser, setLoserUser);
  }, [props.match]);

  let winOrLose = "";
  if (profileName === props.match.winner) {
    winOrLose = "W";
  } else if (profileName === props.match.loser) {
    winOrLose = "L";
  }

  return (
    <div className={MatchCardStyle["match-container"]}>
      <div className={MatchCardStyle["winner-container"]}>
        <img
          className={`${MatchCardStyle["winner-picture"]} ${MatchCardStyle["match-picture"]}`}
          src={winnerUser.picture}
          alt={winnerUser.username}
        />
        <h4
          className={`${MatchCardStyle["winner-name"]} ${MatchCardStyle["match-name"]}`}
        >
          {winnerUser.username}
        </h4>
      </div>
      <div className={MatchCardStyle["match-score-container"]}>
        <h4 className={MatchCardStyle["match-winorlose"]}>{winOrLose}</h4>
        <h3 className={MatchCardStyle["match-score"]}>
          {props.match.score1} - {props.match.score2}
        </h3>
      </div>
      <div className={MatchCardStyle["loser-container"]}>
        <img
          className={`${MatchCardStyle["loser-picture"]} ${MatchCardStyle["match-picture"]}`}
          src={loserUser.picture}
          alt={loserUser.username}
        />
        <h4
          className={`${MatchCardStyle["loser-name"]} ${MatchCardStyle["match-name"]}`}
        >
          {loserUser.username}
        </h4>
      </div>
    </div>
  );
};
