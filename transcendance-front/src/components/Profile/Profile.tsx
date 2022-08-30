import { useState } from 'react';
import './profile.css';
import data from './data_placeholder';

interface _Content {
    contentType: string;
}

const Profile = () => {
    return (
        <section className="profile-container">
            <ProfileHeader />
            <ProfileContent />
        </section>
    );
}


const ProfileHeader = () => {
    return (
        <section className="profile-header-container">
        <div className="profile-id-container">
          <img className="profile-image" src={data.profile_image} alt="" />
          <p className="profile-name-text">testName</p>
          <p className="profile-status">status: {data.status}</p>
        </div>
        <div className="primary-stats">
          <h3>Victories: {data.victories}</h3>
          <h3>Defeats: {data.defeats}</h3>
        </div>
      </section>
    );
}

const ProfileContent = () => {
    const [contentType, setContentType] = useState('friends');
    
    return (
      <section className="profile-content-container">
        <div className="profile-selector-container">
          <button
            className="selector-friends selector-button"
            onClick={() => setContentType("friends")}
          >
            Friends
          </button>
          <button
            className="selector-history selector-button"
            onClick={() => setContentType("history")}
          >
            History
          </button>
          <button
            className="selector-achievements selector-button"
            onClick={() => setContentType("achievements")}
          >
            Achievements
          </button>
        </div>
        <SpecificContent contentType={contentType} />
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

const FriendsContent = () => {
    return (
        <section className="friends-content-container">
            <p>These are friends</p>
        </section>
    );
}

const HistoryContent = () => {
    return (
        <section className="history-content-container">
            <p>This is history...</p>
        </section>
    );
}

const AchievementsContent = () => {
    return (
        <section className="achievements-content-container">
            <p>These are the achievements.</p>
        </section>
    );
}

export default Profile;