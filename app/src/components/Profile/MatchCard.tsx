import { useState, useEffect, useContext } from "react";
import MatchCardStyle from "./MatchCard.module.css";
import { fetchObject, fetchText } from "./FetchValue";
import { ProfileContext } from "../../App";
import { UserImage } from "./UserImage";

export const MatchCard = (props: any) => {
  const profileName = useContext(ProfileContext);

  const [winnerUser, setWinnerUser] = useState(Object);
  const [loserUser, setLoserUser] = useState(Object);

  const newDate = Date.parse(props.match.date);
  const date = new Date(newDate).toString();

  const dateArray = date.split(" ");
  const slicedDate = dateArray.slice(1, 4);
  const finalDate = slicedDate.join(" ");

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
      <div className={MatchCardStyle["match-date-container"]}>
        <h2>Date:</h2>
        <h2>{finalDate}</h2>
      </div>
      <div className={MatchCardStyle["match-stats-container"]}>
        <div className={MatchCardStyle["winner-container"]}>
          <UserImage
            username={winnerUser.username}
            className={`${MatchCardStyle["winner-picture"]} ${MatchCardStyle["match-picture"]}`}
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
          <UserImage
            username={loserUser.username}
            className={`${MatchCardStyle["winner-picture"]} ${MatchCardStyle["match-picture"]}`}
          />
          <h4
            className={`${MatchCardStyle["loser-name"]} ${MatchCardStyle["match-name"]}`}
          >
            {loserUser.username}
          </h4>
        </div>
      </div>
    </div>
  );
};
