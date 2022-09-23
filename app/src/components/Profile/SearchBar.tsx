import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { fetchObject } from "./FetchValue";

export const UsersList = () => {
  const [allUsernames, setAllUsernames] = useState<any>({});

  useEffect(() => {
    fetchObject("users", setAllUsernames);
  }, []);

  const searchElements = allUsernames?.map((searchUsername: string) => {
    return searchUsername && <SearchCard searchUsername={searchUsername} />;
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

export const SearchBar = () => {
  return (
    <div className="main">
      <h1>React Search</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      <UsersList />
    </div>
  );
};
