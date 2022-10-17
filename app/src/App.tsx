import "./App.css";
import "./index.css";
import Menu from "./Pages/Menu";
import Login from "./Pages/Login";
import { ProfileContent } from "./Pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PongRoom from "./Pages/PongRoom";
import Pong from "./components/Pong/Pong";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import Chat from "./Pages/Chat";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { fetchText } from "./components/Profile/FetchValue";
import { SearchBar } from "./components/Profile/SearchBar";
import TwoFAQRCode from "./components/TwoFAQRCode";
import TwoFAVerify from "./Pages/TwoFAVerify";
import { ProfileConfig } from "./components/Profile/ProfileConfig";
import { socket } from "./Pages/PongRoom";
import { Leaderboard } from "./Pages/Leaderboard";

export const ProfileContext = React.createContext("");

const App = () => {
  let [background, setBackground] = useState("root-login");
  const [menuOpening, setMenuOpening] = useState<boolean>(false);
  const [profileUsername, setProfileUsername] = useState("");

  useEffect(() => {
    const cookie = Cookies.get("jwtToken");
    if (cookie) {
      fetchText("profile/username", setProfileUsername);
    }
  }, []);

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
    const cookie = Cookies.get("jwtToken");
    if (cookie) {
      getUsername();
    }
  }, []);

  useEffect(() => {
    if (profileUsername !== "") {
      socket.emit("online", profileUsername);
      setBackground("root-default");
    }
  }, [profileUsername]);

  return (
    <ProfileContext.Provider value={profileUsername}>
      <div className={background}>
        <Router>
          <Routes>
            <Route path="/" element={<Login></Login>} />
            <Route path="/TwoFA" element={<TwoFAQRCode />} />
            <Route path="/TwoFA/verify" element={<TwoFAVerify />} />
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
                path="/Profile"
                element={<ProfileContent username={profileUsername} />}
              />
              <Route
                path="/Profile/search"
                element={<SearchBar username={profileUsername} />}
              />
              <Route
                path="/Profile/user"
                element={<ProfileContent username={profileUsername} />}
              />
              <Route
                path="/Profile/user/:username"
                element={<ProfileContent username={profileUsername} />}
              />
              <Route
                path="/Profile/config"
                element={<ProfileConfig username={profileUsername} />}
              />
              <Route path="/Chat" element={<Chat></Chat>} />
            </Route>
            <Route path="/Leaderboard" element={<Leaderboard />} />
            {/* <Route
                path="/Achievment"
                element={
                  <div style={{ color: "white", fontSize: "75px" }}>
                    ACHIEVMENT
                  </div>
                }
              /> */}
          </Routes>
        </Router>
      </div>
    </ProfileContext.Provider>
  );
};

export default App;
