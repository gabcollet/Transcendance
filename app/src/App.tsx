import "./App.css";
import "./index.css";
import Menu from "./Pages/Menu";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PongRoom from "./Pages/PongRoom";
import Pong from "./components/Pong/Pong";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Chat from "./Pages/Chat";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { fetchText } from "./components/Profile/FetchValue";
import TwoFAQRCode from "./components/TwoFAQRCode";
import TwoFAVerify from "./Pages/TwoFAVerify";

const App = () => {
  const [profileUsername, setProfileUsername] = useState("test");
  const [background, setBackground] = useState("root-default");
  const [menuOpening, setMenuOpening] = useState<boolean>(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchText("profile/username", setProfileUsername);
  }, []);

  const changeBG = (newClassName: string) => {
    setBackground(newClassName);
  };

  const [username, setUsername] = useState("USER NOT LOADED");

  useEffect(() => {
    async function getUsername() {
      await fetch("http://localhost:3030/profile/username", {
        credentials: "include",
        headers: {
          Authorization: `bearer ${Cookies.get("jwtToken")}`,
        },
      })
        .then((res) => res.text())
        .then((data) => setUsername(data));
    }
    getUsername();
  }, []);

  return (
    <div className={background}>
      <Router>
        <Routes>
          <Route path="/" element={<Login onChangeBg={changeBG}></Login>} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/TwoFA" element={<TwoFAQRCode />} />
            <Route path="/TwoFA/verify" element={<TwoFAVerify />} />
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
                <div style={{ color: "white", fontSize: "75px" }}>SPECTATE</div>
              }
            />
            <Route
              path="/Profile"
              element={
                <div style={{ color: "white", fontSize: "75px" }}>
                  <Profile username={username} />
                </div>
              }
            />
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
  );
};

export default App;
