import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

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
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <p>{error}</p>
        <input
          name="pin"
          type="text"
          placeholder="Enter Pin Code..."
          onChange={(e) => setPin(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TwoFAVerify;
