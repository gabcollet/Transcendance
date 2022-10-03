import axios from "axios";
import React, { FormEventHandler, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

interface UserInput {
  pin: number;
}

const TwoFAVerify = () => {
  const [verified, setVerified] = useState(false);
  const [pin, setPin] = useState(0);
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
        console.log(res.data);
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
    if (pin != 0) verifyPin();
  }, []);

  return verified ? (
    <Navigate to="/Menu" />
  ) : (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <p>{error}</p>
        <input
          name="pin"
          type="text"
          placeholder="Enter Pin Code..."
          onChange={(e) => setPin(parseInt(e.target.value))}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TwoFAVerify;
