import React, { MouseEventHandler, useState } from "react";
import "./App.css";
import Menu from "./Pages/Menu";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PongRoom from "./Pages/PongRoom";
import Pong from './components/Pong/Pong';

const App = () => {
  //   const [pageState, setPageState] = useState("menu");
  //   const [loginState, setLoginState] = useState("off");
  //   let loginEvent = () => {
  //     if (loginState === "off") {
  //       setLoginState("on");
  //     } else setLoginState("off");
  //   };
  //   if (loginState === "off") {
  //     return <Login loginEvent={loginEvent} />;
  //   } else {
  //     return <Menu></Menu>;
  //   }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Menu" element={<Menu/>} />
        <Route path='/PongRoom' element={<PongRoom/>} />
        <Route path="/Pong" element={<Pong/>} />
        <Route
          path="/Spectate"
          element={
            <div style={{ color: "white", fontSize: "75px" }}>SPECTATE</div>
          }
        />
        <Route
          path="/Profile"
          element={
            <div style={{ color: "white", fontSize: "75px" }}>PROFILE</div>
          }
        />
        <Route
          path="/Leaderboard"
          element={
            <div style={{ color: "white", fontSize: "75px" }}>LEADERBOARD</div>
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
          element={<div style={{ color: "white", fontSize: "75px" }}>CHAT</div>}
        />
      </Routes>
    </Router>
  );
};

export default App;
