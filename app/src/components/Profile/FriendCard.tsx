import { useState, useEffect } from 'react';
import styles from './ProfileContent.module.css';
import data from './data_placeholder';


export const FriendCard = (props: any) => {
    return (
      <div className={styles["friends-content-individual"]}>
        <div className={styles["individual-id"]}>
          <img
            src={props.friendUsername.profile_image}
            alt={props.friendUsername.name}
          />
          <h4>{props.friendUsername.name}</h4>
          <p>status: {props.friendUsername.status}</p>
        </div>
        <div className={styles["individual-buttons"]}>
          <button>Add friend</button>
          <button>Message</button>
        </div>
        <div className={styles["individual-stats"]}>
          <h3>W: {props.friendUsername.victories}</h3>
          <h3>L: {props.friendUsername.defeats}</h3>
        </div>
      </div>
    );
}