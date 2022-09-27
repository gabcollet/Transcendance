import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { fetchObject } from "./FetchValue";
import { FriendCard } from "./FriendCard";
import styles from "./SearchBar.module.css";
import { ProfileProps, UsersListProps } from "./ProfileInterfaces";

export const UsersList = (props: UsersListProps) => {
  const [searchUsers, setSearchUsers] = useState<any>([]);

  useEffect(() => {
    console.log(`This is searchString ${props.searchString}`);
    fetchObject(`users?search=${props.searchString}`, setSearchUsers);
  }, [props.searchString]);

  const searchElements = searchUsers?.map((searchUsername: ProfileProps) => {
    console.log(searchUsername);
    return (
      searchUsername && (
        <FriendCard
          friendUsername={searchUsername.username}
          searchString={props.searchString}
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
