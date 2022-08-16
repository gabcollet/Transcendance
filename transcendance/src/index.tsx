import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className="header"></div>
    <div className="middle">
      <div className="content">
        <App></App>
      </div>
    </div>
    <div className="footer"></div>
  </React.StrictMode>
);
