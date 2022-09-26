import axios from "axios";
import { useState } from "react";

const TwoFAValidation = () => {
  let [qrcode, setQrcode] = useState("");

  axios.get("http://localhost:3030/auth/twoFA/pair").then((response) => {
    console.log(response.data);
    setQrcode(response.data);
  });

  return (
    <div className="">
      <img src={qrcode} alt="" />
      {/* <img src={Cookies.get("qrcode")} alt="" /> */}
    </div>
  );
};

export default TwoFAValidation;
