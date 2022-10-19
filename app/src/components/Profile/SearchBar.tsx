/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { fetchObject } from "./FetchValue";
import { FriendCard } from "./FriendCard";
import ProfileStyles from "../../Pages/Profile.module.css";
import SearchStyles from "./SearchBar.module.css";
import { ProfileProps, UsersListProps } from "./ProfileInterfaces";
import { Link } from "react-router-dom";
import { ProfileButtons } from "./ProfileButtons";

export const UsersList = (props: UsersListProps) => {
  const [searchUsers, setSearchUsers] = useState<any>([]);

  useEffect(() => {
    fetchObject(`users?search=${props.searchString}`, setSearchUsers);
  }, [props.searchString]);

  const searchElements = searchUsers?.map((searchUsername: ProfileProps) => {
    return (
      searchUsername && (
        <FriendCard
          key={searchUsername.username}
          friendUsername={searchUsername.username}
          searchString={props.searchString}
          onRemove={() => {}}
        />
      )
    );
  });

  return <section className="searchList">{searchElements}</section>;
};

export const SearchBar = (props: ProfileProps) => {
  const [searchString, setSearchString] = useState("");

  const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const searchButton = e.target as HTMLButtonElement;
      setSearchString(searchButton.value);
    }
  };

  return (
    <div className={ProfileStyles["profile-page-container"]}>
      <ProfileButtons />
      <div className={ProfileStyles["profile-sub-container"]}>
        <div className={SearchStyles["search-container"]}>
          <div className={SearchStyles["search-bar"]}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Search"
              onKeyPress={handleChange}
            />
          </div>
          <div className={SearchStyles["search-results"]}>
            <UsersList searchString={searchString} />
          </div>
        </div>
      </div>
    </div>
  );
};
