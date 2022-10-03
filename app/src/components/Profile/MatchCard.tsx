import { useState, useEffect, useContext } from "react";
import MatchCardStyle from "./MatchCard.module.css";
import { fetchObject, fetchText } from "./FetchValue";

export const MatchCard = (props: any) => {
  const [winnerUser, setWinnerUser] = useState(Object);
  const [loserUser, setLoserUser] = useState(Object);

  useEffect(() => {
    fetchObject("users/" + props.match.winner, setWinnerUser);
    fetchObject("users/" + props.match.loser, setLoserUser);
  }, [props.match]);

  return (
    <div className={MatchCardStyle["match-content-individual"]}>
      <div className={MatchCardStyle["match-id"]}>
        <div className={MatchCardStyle["me-id"]}>
          <img src={winnerUser.picture} alt={winnerUser.username} />
          <h4>{winnerUser.username}</h4>
        </div>
        <h3>
          {props.match.score1} - {props.match.score2}
        </h3>
        <div className={MatchCardStyle["foe-id"]}>
          <img src={loserUser.picture} alt={loserUser.username} />
          <h4>{loserUser.username}</h4>
        </div>
      </div>
    </div>
  );
};
