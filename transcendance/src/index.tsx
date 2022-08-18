import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./NavBar.css";
import "./Footer.css";
import App from "./App";
import NavBar from "./NavBar";
import Footer from "./Footer";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className="top-banner">
      <NavBar></NavBar>
    </div>
    <div className="content">
      <App></App>
    </div>
    <div className="footer">
      <Footer></Footer>
    </div>
  </React.StrictMode>
);
