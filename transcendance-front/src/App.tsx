import "./App.css";
import Menu from "./Pages/Menu";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pong from './components/Pong/Pong';
import Profile from './components/Profile/Profile';
import { useState } from 'react';

const App = () => {
  let [background, setBackground] = useState("root-login");

  const changeBG = (newClassName: string) => {
    setBackground(newClassName);
  };

  return (
    <div className={background}>
      <Router>
        <Routes>
          <Route path="/" element={<Login onChangeBg={changeBG}></Login>} />
          <Route path="/Menu" element={<Menu></Menu>} />
          <Route
            path="/Pong"
            element={
              <div style={{ fontSize: "0px", border: "2px solid white" }}>
                <Pong />
              </div>
            }
          />
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
                <Profile />
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
              <div style={{ color: "white", fontSize: "75px" }}>ACHIEVMENT</div>
            }
          />
          <Route
            path="/Chat"
            element={
              <div style={{ color: "white", fontSize: "75px" }}>CHAT</div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
