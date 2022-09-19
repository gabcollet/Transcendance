import { useState, useEffect } from 'react';
import React from 'react';
import styles from './Profile.module.css';
import data from '../components/Profile/data_placeholder';
import Cookies from 'js-cookie';
import { ProfileHeader } from '../components/Profile/ProfileHeader';
import { ProfileBody } from '../components/Profile/ProfileContent';

interface _Content {
    contentType: string;
}

const Profile = (props: any) => {
    console.log(`Username: ${props.username}`);
    return (
        <section className={styles["profile-container"]}>
            <ProfileHeader />
            <ProfileBody />
        </section>
    );
}

export default Profile;
