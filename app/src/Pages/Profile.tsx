import { useState, useEffect } from 'react';
import React from 'react';
import styles from './Profile.module.css';
import data from '../components/Profile/data_placeholder';
import Cookies from 'js-cookie';
import { ProfileHeader } from '../components/Profile/ProfileHeader';
import { ProfileBody } from '../components/Profile/ProfileBody';
import { fetchObject } from '../components/Profile/FetchValue';

interface _Content {
    contentType: string;
}

const Profile = (props: any) => {

    return (
        <section className={styles["profile-container"]}>
        {props.username !== "USER NOT LOADED" &&
            <ProfileHeader username={props.username} />
        }
        {props.username !== "USER NOT LOADED" &&
            <ProfileBody username={props.username} />
        }
        </section>
    );
}

export default Profile;
