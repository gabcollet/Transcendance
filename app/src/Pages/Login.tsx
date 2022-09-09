import "./Login.css";
import { FC, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";

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

  const openInWindow = (cb: Function, url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  props.onChangeBg("root-login");

  const genRandStr = (length: number) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charLength));
    }

    return result;
  };

  const url: string =
    "https://api.intra.42.fr/oauth/authorize?client_id=" +
    "3187aa6aec15b19df251d4424b7bc8f7fc761603b4bae21e049ce800e217a812" +
    "&redirect_uri=" +
    "http%3A%2F%2Flocalhost%3A3030%2Fauth%2Fredirect" +
    "&response_type=code" +
    "&state=" +
    genRandStr(12);

  return !isClicked ? (
    <div className="login-container">
      <button className="login-btn" onClick={login42Handler}>
        Are you Ready to Transcend ?
      </button>
    </div>
  ) : (
    <div className="login-container">
      <a href={url}>Login with 42</a>
    </div>
  );
};

export default Login;
