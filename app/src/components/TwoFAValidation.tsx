import Cookies from "js-cookie";
import axios from "axios";

const TwoFAValidation = () => {
  return (
    <div className="">
      <img src={Cookies.get("qrcode")} alt="" />
    </div>
  );
};

export default TwoFAValidation;
