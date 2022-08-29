import "./Login.css";
import { Link } from "react-router-dom";

const Login = (props: any) => {
  return (
    <div className="login-wrap">
      <p>Please log in</p>
      <Link className="link" to="/Menu">
        <button onClick={props.loginEvent}>LOGIN</button>
      </Link>
    </div>
  );
};

export default Login;
