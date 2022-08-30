import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import LoginForm from "../components/Login/LoginForm";

const Login = () => {
  const [showForm, setshowForm] = useState(false);

  const forDisplayHandler = () => {
    setshowForm(!showForm);
  };

  return !showForm ? (
    <div className="login-container">
      <button className="login-btn" onClick={forDisplayHandler}>
        <FontAwesomeIcon className="login-icon" icon={faUser}></FontAwesomeIcon>
      </button>
    </div>
  ) : (
    <LoginForm />
  );
};

export default Login;
