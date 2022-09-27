import axios from "axios";
import styles from "../Pages/Login.module.css";
import { useEffect, useState } from "react";

const TwoFAQRCode = () => {
  const [qrcode, setQrcode] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3030/auth/twoFA/pair", { withCredentials: true })
      .then((response) => {
        setQrcode(response.data);
      });
  }, []);

  return (
    <div className="">
      <p>Scan the QR code with Google Authenticator app</p>
      <img src={qrcode} alt="" />
      <a
        className={styles["auth-link"]}
        href="http://localhost:3000/TwoFA/verify"
      >
        Continue
      </a>
    </div>
  );
};

export default TwoFAQRCode;
