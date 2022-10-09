import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = () => {
  const isVerified = () => {
    const token = Cookies.get("jwtToken");

    if (token) return true;
    else return false;
  };

  return isVerified() ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
