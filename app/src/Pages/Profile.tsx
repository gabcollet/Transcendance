import { useState, useEffect } from "react";
import React from "react";
import styles from "./Profile.module.css";
import data from "../components/Profile/data_placeholder";
import Cookies from "js-cookie";
import { ProfileHeader } from "../components/Profile/ProfileHeader";
import { ProfileBody } from "../components/Profile/ProfileBody";
import { fetchObject } from "../components/Profile/FetchValue";
import { Link, Outlet, Route, Routes, useParams } from "react-router-dom";
import { SearchBar } from "../components/Profile/SearchBar";
import { ProfileProps } from "../components/Profile/ProfileInterfaces";

export const ProfileContent = (props: ProfileProps) => {
  let usedUsername = props.username;
  let { username } = useParams();
  if (username) {
    usedUsername = username;
  }
  return (
    <>
      {props.username !== "USER NOT LOADED" && (
        <ProfileHeader username={usedUsername} />
      )}
      {props.username !== "USER NOT LOADED" && (
        <ProfileBody username={usedUsername} />
      )}
    </>
  );
};

const Profile = (props: ProfileProps) => {
  return (
    <>
      <Link className={styles["search-link"]} to="/Profile/user">
        <button className={styles["profile-buttons"]} type="button">
          User
        </button>
      </Link>
      <Link className={styles["search-link"]} to="/Profile/search">
        <button className={styles["profile-buttons"]} type="button">
          Search
        </button>
      </Link>
      <Link className={styles["search-link"]} to="/Profile/config">
        <button className={styles["profile-buttons"]} type="button">
          Config
        </button>
      </Link>

      <section className={styles["profile-container"]}>
        <Outlet />
      </section>
    </>
  );
};

export default Profile;
