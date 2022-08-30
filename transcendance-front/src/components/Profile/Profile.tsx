import './profile.css';
import data from './data_placeholder';

const ProfileHeader = () => {
    return (
      <section className="profile-header">
        <img className="profile-image" src={data.profile_image} alt="" />
        <p className="profile-name-text">testName</p>
        <div className="primary-stats">
          <h3>Victories: {data.victories}</h3>
          <h3>Defeats: {data.defeats}</h3>
        </div>
      </section>
    );
}

const Profile = () => {
    return (
        <section className="profile-container">
            <ProfileHeader />
            <ProfileAchievements />
            <ProfileFriends />
        </section>
    );
}

const ProfileAchievements = () => {
    return (
        <section className="profile-achievements-container">
            <p>these are the achievemetns</p>
        </section>
    );
}

const ProfileFriends = () => {
    return (
        <section className="profile-friends-container">
            <p>these are the friends</p>
        </section>
    );
}

export default Profile;