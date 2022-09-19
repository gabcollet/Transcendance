import "./App.css";
import "./index.css";
import Menu from "./Pages/Menu";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PongRoom from "./Pages/PongRoom";
import Pong from "./components/Pong/Pong";
import Chat from "./Pages/Chat";
import { useState } from "react";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  let [background, setBackground] = useState("root-default");
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const changeBG = (newClassName: string) => {
    setBackground(newClassName);
  };

  return (
    <div className={background}>
      <Router>
        <Routes>
          <Route path="/" element={<Login onChangeBg={changeBG}></Login>} />
          <Route element={<ProtectedRoutes />}>
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
