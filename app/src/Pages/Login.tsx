import "./Login.css";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

const Login: FC<{ onChangeBg: (newClassName: string) => void }> = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [login42, setLogin42] = useState("login-btn");

  const login42Handler = () => {
    setIsClicked(!isClicked);
    setLogin42("login-42-btn");
  };

  const changeBGHandler = () => {
    props.onChangeBg("root-default");
  };
  props.onChangeBg("root-login");
  return !isClicked ? (
    <div className="login-container">
      <button className="login-btn" onClick={login42Handler}>
        Are you Ready to Transcend ?
      </button>
    </div>
  ) : (
    <div className="login-container">
      <Link className="link" to="/SignIn">
        <button className={login42} onClick={changeBGHandler}>
          Login with 42
        </button>
      </Link>
    </div>
  );
};

export default Login;
