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
import ProtectedRoutes from "./components/ProtectedRoutes";
import { fetchText } from "./components/Profile/FetchValue";

const App = () => {
  let [background, setBackground] = useState("root-default");
  const [profileUsername, setProfileUsername] = useState("test");
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
            <Route path="/TwoFA" element={<TwoFAValidation />} />
            <Route path="/Menu" element={<Menu />} />
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
            <Route
              path="/Chat"
              element={
                <div style={{ color: "white", fontSize: "75px" }}>CHAT</div>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
