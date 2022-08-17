import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./NavBar.css";
import App from "./App";
import TopBanner from "./NavBar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className="top-banner">
      <TopBanner></TopBanner>
    </div>
    <div className="middle">
      <div className="content">
        <App></App>
      </div>
    </div>
    <div className="footer"></div>
  </React.StrictMode>
);
