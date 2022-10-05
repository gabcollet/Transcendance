import axios from "axios";
import styles from "../Pages/Login.module.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Pages/PongRoom.css";

const TwoFAQRCode = () => {
  const navigate = useNavigate();
  const [qrcode, setQrcode] = useState("");
  axios.defaults.headers.common["Authorization"] = `bearer ${Cookies.get(
    "jwtToken"
  )}`;
  useEffect(() => {
    axios
      .get("http://localhost:3030/auth/twoFA/pair", {
        withCredentials: true,
        headers: {
          Authorization: `bearer ${Cookies.get("jwtToken")}`,
        },
      })
      .then((response) => {
        setQrcode(response.data);
      });
  }, []);

  const handleClick = () => {
    navigate("/twoFA/verify");
  };

  return (
    <div className="">
      <div>
        <p style={{ color: "#fff", fontSize: "35px", paddingBottom: "20px" }}>
          Scan the QR code with Google Authenticator app
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <img src={qrcode} style={{ display: "flex", margin: "auto" }} />
      </div>
      <div style={{ textAlign: "center", paddingTop: "30px" }}>
        <button
          className="button-78"
          style={{ margin: "auto" }}
          onClick={handleClick}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TwoFAQRCode;
