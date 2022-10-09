import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = () => {
  const isVerified = () => {
    const verified = Cookies.get("verified");

    if (verified === "true") return true;
    else return false;
  };

  return isVerified() ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
