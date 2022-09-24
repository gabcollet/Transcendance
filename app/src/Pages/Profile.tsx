import { useState, useEffect } from "react";
import React from "react";
import styles from "./Profile.module.css";
import data from "../components/Profile/data_placeholder";
import Cookies from "js-cookie";
import { ProfileHeader } from "../components/Profile/ProfileHeader";
import { ProfileBody } from "../components/Profile/ProfileBody";
import { fetchObject } from "../components/Profile/FetchValue";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { SearchBar } from "../components/Profile/SearchBar";

interface _Content {
  contentType: string;
}

export const ProfileContent = (props: any) => {
  return (
    <>
      {props.username !== "USER NOT LOADED" && (
        <ProfileHeader username={props.username} />
      )}
      {props.username !== "USER NOT LOADED" && (
        <ProfileBody username={props.username} />
      )}
    </>
  );
};

const Profile = (props: any) => {
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

      <section className={styles["profile-container"]}>
        <Outlet />
      </section>
    </>
  );
};

export default Profile;
