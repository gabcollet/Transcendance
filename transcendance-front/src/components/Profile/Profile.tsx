import './profile.css';
import data from './data_placeholder';

const ProfileHeader = () => {
    return (
        <section className="profile-header">
            <img className="profile-image" src={data.profile_image} alt="" />
            <div className="profile-name-container">
                <p className="profile-name-text">testName</p>
            </div>
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
        </section>
    );
}

export default Profile;