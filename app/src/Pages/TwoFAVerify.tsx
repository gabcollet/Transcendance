import axios from "axios";
import React, { useCallback, useState } from "react";
import { Navigate } from "react-router-dom";
import { socket } from "../Pages/PongRoom";

import "../Pages/PongRoom.css";

const TwoFAVerify = () => {
  const [verified, setVerified] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const verifyPin = useCallback(async () => {
    const payload = await axios.post(
      "http://localhost:3030/auth/TwoFA/verify",
      { pin: pin },
      {
        withCredentials: true,
      }
    );

    if (payload.data["verified"] === false)
      setError("Wrong pin code, Try Again!");

    if (payload.data["verified"] === true)
      socket.emit("online", payload.data["username"]);

    setVerified(payload.data["verified"]);
  }, [pin]);

  const handleSubmit = useCallback(
    (e: React.BaseSyntheticEvent) => {
      e.preventDefault();
      verifyPin();
    },
    [verifyPin]
  );

  const handleChange = useCallback((e: React.BaseSyntheticEvent) => {
    setPin(e.target.value);
  }, []);

  return verified ? (
    <Navigate to="/menu" />
  ) : (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <p style={{ color: "#fff", fontSize: "35px", paddingBottom: "20px" }}>
            {error}
          </p>
        </div>
        <input
          type="text"
          name="pin"
          value={pin}
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
          onChange={handleChange}
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
