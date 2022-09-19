import { useState } from 'react';
import styles from './ProfileHeader.module.css';
import { UserDisplayName } from './UserDisplayName';
import { UserImage } from './UserImage';
import { UserLosses } from './UserLosses';
import { UserStatus } from './UserStatus';
import { UserWins } from './UserWins';

export const ProfileHeader = () => {
    
    return (
      <section className={styles["profile-header-container"]}>
        <div className={styles["profile-id-container"]}>
          <div className={styles["id-container-info"]}>
            <UserImage username="laube" className={styles["profile-image"]} />
            <UserDisplayName username="laube" className={styles["profile-name-text"]} />
            <UserStatus username="laube" className={styles["profile-status"]} />
          </div>
          <div className={styles["id-container-buttons"]}>
            <button>Add friend</button>
            <button>Message</button>
          </div>
        </div>
        <div className={styles["primary-stats"]}>
          <UserWins username="laube" />
          <UserLosses username="laube" />
        </div>
        <div className={styles["secondary-stats"]}>
          <p>Latest Achievement:</p>
        </div>
      </section>
    );
  }