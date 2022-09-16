import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const getCookie = (): Boolean => {
  const token = Cookies.get("jwtToken");

  if (!token) return false;
  return true;
};

const ProtectedRoutes = () => {
  const token = getCookie();
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
