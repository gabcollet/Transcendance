import "./LoginForm.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="login-container">
      <div className="form-card">
        <input
          className="input-field field-username"
          type="text"
          placeholder="Enter Username"
        />
        <input
          className="input-field field-password"
          type="password"
          placeholder="Enter Password"
        />
        <Link className="link" to="/Menu">
          <button className="submit-btn" type="submit">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
