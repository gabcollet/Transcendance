import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

// const isVerified = (): Boolean => {
//   const verified = Cookies.get("verified");
//   if (verified === "false") return false;
//   else return true;
// };

function parseJwt(token: string) {
  if (token === "") return false;
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  const result = JSON.parse(jsonPayload);

  return result["verified"];
}

const ProtectedRoutes = () => {
  const [verified, setVerified] = useState(false);
  const token = Cookies.get("verified");
  setVerified(parseJwt(token!));

  // const verified = result["verified"];

  return verified ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
