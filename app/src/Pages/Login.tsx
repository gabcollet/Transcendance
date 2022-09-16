// import "./Login.css";
import styles from "./Login.module.css";
import { FC, useState } from "react";

const Login: FC<{ onChangeBg: (newClassName: string) => void }> = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  // const [login42, setLogin42] = useState("login-btn");

  const login42Handler = () => {
    setIsClicked(!isClicked);
    // setLogin42("login-42-btn");
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

  console.log(process.env.REACT_APP_REDIRECT_BASE_URL);
  console.log(process.env.REACT_APP_CLIENT_ID);
  console.log(process.env.REACT_APP_REDIRECT_URI);

  const url: string =
    process.env.REACT_APP_REDIRECT_BASE_URL +
    "?client_id=" +
    process.env.REACT_APP_CLIENT_ID +
    "&redirect_uri=" +
    process.env.REACT_APP_REDIRECT_URI +
    "&response_type=code" +
    "&state=" +
    genRandStr(12);

  return !isClicked ? (
    <div className={styles["login-container"]}>
      <button className={styles["login-btn"]} onClick={login42Handler}>
        Are you Ready to Transcend ?
      </button>
    </div>
  ) : (
    <div className={styles["login-container"]}>
      <a className={styles["auth-link"]} href={url}>
        Login with 42
      </a>
    </div>
  );
};

export default Login;
