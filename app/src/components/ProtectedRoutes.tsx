import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const isVerified = (): Boolean => {
  const verified = Cookies.get("verified");
  if (verified === "false") return false;
  else return true;
};

const ProtectedRoutes = () => {
  return isVerified() ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
