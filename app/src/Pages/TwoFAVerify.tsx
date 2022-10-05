import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import "../Pages/PongRoom.css";
import { faBorderStyle } from "@fortawesome/free-solid-svg-icons";

const TwoFAVerify = () => {
  const [verified, setVerified] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  async function verifyPin() {
    axios
      .post(
        "http://localhost:3030/auth/TwoFA/verify",
        { pin: pin },
        {
          withCredentials: true,
          headers: {
            Authorization: `bearer ${Cookies.get("jwtToken")}`,
          },
        }
      )
      .then((res) => {
        setVerified(res.data);
        if (res.data === false) setError("Wrong Pin Code, Try Again!");
      })
      .catch((err) => console.log(err));
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    verifyPin();
  };

  useEffect(() => {
    if (pin != "") verifyPin();
  }, []);

  return verified ? (
    <Navigate to="/Menu" />
  ) : (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <p style={{ color: "#fff", fontSize: "35px", paddingBottom: "20px" }}>
            {error}
          </p>
        </div>
        <input
          name="pin"
          type="text"
          style={{
            marginRight: "10px",
            backgroundColor: "#f000",
            borderRadius: "10px",
            height: "40px",
            borderColor: "#FD0552",
            borderWidth: "5px",
            color: "#fff",
            outline: "none",
          }}
          placeholder="Enter Pin Code..."
          onChange={(e) => setPin(e.target.value)}
        />
        <button
          className="button-78"
          type="submit"
          style={{ marginLeft: "20px" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TwoFAVerify;
