import axios from "axios";
import styles from "../Pages/Login.module.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

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
      <p>Scan the QR code with Google Authenticator app</p>
      <img src={qrcode} alt="" />
      <button className={styles["login-btn"]} onClick={handleClick}>
        Continue
      </button>
    </div>
  );
};

export default TwoFAQRCode;
