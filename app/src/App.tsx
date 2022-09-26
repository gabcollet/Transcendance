import "./App.css";
import "./index.css";
import Menu from "./Pages/Menu";
import Login from "./Pages/Login";
import Profile, { ProfileContent } from "./Pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PongRoom from "./Pages/PongRoom";
import Pong from "./components/Pong/Pong";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import Chat from "./Pages/Chat";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { fetchText } from "./components/Profile/FetchValue";
import { SearchBar } from "./components/Profile/SearchBar";

export const UserContext = React.createContext("");

const App = () => {
  let [background, setBackground] = useState("root-default");
  const [menuOpening, setMenuOpening] = useState<boolean>(false);
  const [profileUsername, setProfileUsername] = useState("USER NOT LOADED");
  // const [profileUsername, setProfileUsername] = useState("test");
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchText("profile/username", setProfileUsername);
  }, []);

  const changeBG = (newClassName: string) => {
    setBackground(newClassName);
  };

  useEffect(() => {
    async function getUsername() {
      await fetch("http://localhost:3030/profile/username", {
        credentials: "include",
        headers: {
          Authorization: `bearer ${Cookies.get("jwtToken")}`,
        },
      })
        .then((res) => res.text())
        .then((data) => setProfileUsername(data));
    }
    getUsername();
  }, []);

  return (
    <UserContext.Provider value={profileUsername}>
      <div className={background}>
        <Router>
          <Routes>
            <Route path="/" element={<Login onChangeBg={changeBG}></Login>} />
            <Route element={<ProtectedRoutes />}>
              <Route
                path="/Menu"
                element={
                  <Menu opening={menuOpening} setOpening={setMenuOpening} />
                }
              />
              <Route path="/PongRoom" element={<PongRoom />} />
              <Route path="/Pong" element={<Pong />} />
              <Route
                path="/Spectate"
                element={
                  <div style={{ color: "white", fontSize: "75px" }}>
                    SPECTATE
                  </div>
                }
              />
              <Route
                path="/Profile"
                element={
                  <div style={{ color: "white", fontSize: "75px" }}>
                    <Profile username={profileUsername} />
                  </div>
                }
              >
                <Route
                  path="search"
                  element={<SearchBar username={profileUsername} />}
                />
                <Route
                  path="user"
                  element={<ProfileContent username={profileUsername} />}
                />
              </Route>
              <Route
                path="/Leaderboard"
                element={
                  <div style={{ color: "white", fontSize: "75px" }}>
                    LEADERBOARD
                  </div>
                }
              />
              <Route
                path="/Achievment"
                element={
                  <div style={{ color: "white", fontSize: "75px" }}>
                    ACHIEVMENT
                  </div>
                }
              />
              <Route path="/Chat" element={<Chat></Chat>} />
            </Route>
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
};

export default App;
