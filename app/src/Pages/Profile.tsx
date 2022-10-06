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
import { ProfileButtons } from "../components/Profile/ProfileButtons";

export const ProfileContent = (props: ProfileProps) => {
  let usedUsername = props.username;
  let { username } = useParams();
  if (username) {
    usedUsername = username;
  }
  return (
    <div className={styles["profile-page-container"]}>
      <ProfileButtons />

      <section className={styles["profile-sub-container"]}>
        {props.username !== "USER NOT LOADED" && (
          <ProfileHeader username={usedUsername} />
        )}
        {props.username !== "USER NOT LOADED" && (
          <ProfileBody username={usedUsername} />
        )}
      </section>
    </div>
  );
};
