import { useState, useEffect } from 'react';
import React from 'react';
import './profile.css';
import data from './data_placeholder';
import Cookies from 'js-cookie';

interface _Content {
    contentType: string;
}

const fetchValue = (key: string, propsValue: string, setCallBack: any) => {
  async function fetchIt() {
    await fetch('http://localhost:3030/users/' + propsValue + '/' + key, {
      credentials: 'include', 
      headers: {
        'Authorization': `bearer ${Cookies.get('jwtToken')}`,
      }
    })
    .then(res => res.text())
    .then(data => setCallBack(data));
  }
  fetchIt();
}

const UserDisplayName = (props: any) => {
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    fetchValue('displayname', props.userName, setDisplayName);
  });

  return (
      <p className="profile-name-text">{displayName}</p>
  );
}

// Takes userName as a prop. This userName should match a 42 login.
const UserImage = (props: any) => {
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
      fetchValue('img', props.userName, setUserImage);
    });
  return (
    <img className="profile-image" src={userImage} alt="" />
  );
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
  const [profileName, setProfileName] = useState('anon');
  
  return (
    <section className="profile-header-container">
      <div className="profile-id-container">
        <div className="id-container-info">
          <UserImage userName="laube" />
          <UserDisplayName userName="laube" />
          <p className="profile-status">status: {data.status}</p>
        </div>
        <div className="id-container-buttons">
          <button>Add friend</button>
          <button>Message</button>
        </div>
      </div>
      <div className="primary-stats">
        <h3>Wins: {data.victories}</h3>
        <h3>Losses: {data.defeats}</h3>
      </div>
      <div className="secondary-stats">
        <p>Latest Achievement:</p>
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
        <div className="specific-content">
          <SpecificContent contentType={contentType} />
        </div>
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
    const friendsElement = data.friends.map((friend) => {
        return (
          <div className="friends-content-individual">
            <div className="individual-id">
              <img src={friend.profile_image} alt={friend.name} />
              <h4>{friend.name}</h4>
              <p>status: {friend.status}</p>
            </div>
            <div className="individual-buttons">
              <button>Add friend</button>
              <button>Message</button>
            </div>
            <div className="individual-stats">
              <h3>W: {friend.victories}</h3>
              <h3>L: {friend.defeats}</h3>
            </div>
          </div>
        );
    });
    return (
        <section className="friends-content-container">
            {friendsElement}
        </section>
    );
}

const HistoryContent = () => {
  const matchesElement = data.matches.map((match) => {
    return (
      <div className="match-content-individual">
        <div className="match-id">
          <div className="me-id">
            <img src={data.profile_image} alt={data.name} />
            <h4>{data.name}</h4>
          </div>
          <h3>{match.my_points} - {match.foe_points}</h3>
          <div className="foe-id">
            <img src={match.foe_profile_image} alt={match.opponent_name} />
            <h4>{match.opponent_name}</h4>
          </div>
        </div>
      </div>
    );
  });
  return (
    <section className="history-content-container">{matchesElement}</section>
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
