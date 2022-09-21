import styles from './ProfileContent.module.css';

export const FriendCard = (props: any) => {
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
</div>;
}

