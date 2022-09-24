import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { fetchObject } from "./FetchValue";
import { FriendCard } from "./FriendCard";
import styles from "./SearchBar.module.css";

export const UsersList = () => {
  const [allUsernames, setAllUsernames] = useState<any>([]);

  useEffect(() => {
    fetchObject("users", setAllUsernames);
  }, []);

  const searchElements = allUsernames?.map((searchUsername: any) => {
    return (
      searchUsername && <FriendCard friendUsername={searchUsername.username} />
    );
  });

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
  return (
    <div className={styles["search-container"]}>
      <div className={styles["search-bar"]}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      <div className={styles["search-results"]}>
        <UsersList />
      </div>
    </div>
  );
};
