import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { fetchObject } from "./FetchValue";
import { FriendCard } from "./FriendCard";
import styles from "./SearchBar.module.css";

export const UsersList = (props: any) => {
  const [searchUsers, setSearchUsers] = useState<any>([]);

  useEffect(() => {
    console.log(`This is searchString ${props.searchString}`);
    fetchObject(`users?search=${props.searchString}`, setSearchUsers);
  }, [props.searchString]);

  const searchElements = searchUsers?.map((searchUsername: any) => {
    return (
      searchUsername && (
        <FriendCard
          friendUsername={searchUsername.username}
          searchString={props.searchString}
        />
      )
    );
  });
  console.log("This is searchUsers");
  console.log(searchUsers);
  console.log("This is searchElements");
  console.log(searchElements);

  return <section className="searchList">{searchElements}</section>;
};

export const SearchCard = (props: any) => {
  const [searchUser, setSearchUser] = useState<any>({});

  useEffect(() => {
    fetchObject("users/" + props.searchUsername, setSearchUser);
  }, []);

  return (
    <div className="searchCard">
      <img src={searchUser.picture} alt={searchUser.username} />
      <h4>{searchUser.username}</h4>
    </div>
  );
};

export const SearchBar = (props: any) => {
  const [searchString, setSearchString] = useState("");

  const handleChange = (e: any) => {
    if (e.key === "Enter") {
      setSearchString(e.target.value);
    }
  };

  return (
    <div className={styles["search-container"]}>
      <div className={styles["search-bar"]}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
          onKeyPress={handleChange}
        />
      </div>
      <div className={styles["search-results"]}>
        <UsersList searchString={searchString} />
      </div>
    </div>
  );
};
