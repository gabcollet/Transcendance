import style from "./AchievementCard.module.css";

export const AchievementCard = (props: any) => {
  let achievementImage = "/assets/achievement_images/unknown.png";
  let achievementTitle = "???";
  let achievementDescription = "???";

  if (props.achieved === true) {
    if (props.name === "firstWin") {
      achievementImage = "/assets/achievement_images/first_win.png";
      achievementTitle = "First Win";
      achievementDescription =
        "You've got your first win! You have to start somewhere..";
    } else if (props.name === "first5Wins") {
      achievementImage = "/assets/achievement_images/five_wins.png";
      achievementTitle = "5 Wins";
      achievementDescription = "Not so little now, chump! You got 5 wins!";
    } else if (props.name === "first10Wins") {
      achievementImage = "/assets/achievement_images/ten_wins.png";
      achievementTitle = "10 Wins";
      achievementDescription = "You're into the big league! You got 10 wins!";
    } else if (props.name === "streak5Wins") {
      achievementImage = "/assets/achievement_images/streak_five_wins.png";
      achievementTitle = "5 Win Streak";
      achievementDescription = "Is it just luck? You won 5 games in a row!";
    } else if (props.name === "streak5Losses") {
      achievementImage = "/assets/achievement_images/streak_five_losses.png";
      achievementTitle = "5 Loss Streak";
      achievementDescription =
        "I hope you didn't plan to make a living out of this game. You lost 5 games in a row!";
    }
  }

  return (
    <div className={style["achievement-container"]}>
      <div className={style["achievement-head-container"]}>
        <img
          className={style["achievement-image"]}
          src={achievementImage}
          alt="Some achievement"
        />
        <h4 className={style["achievement-title"]}>{achievementTitle}</h4>
      </div>
      <div className={style["achievement-body-container"]}>
        <p className={style["achievement-description"]}>
          {achievementDescription}
        </p>
      </div>
    </div>
  );
};
