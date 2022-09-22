import Cookies from "js-cookie";

const TwoFAValidation = () => {
  return (
    <div className="">
      <img src={Cookies.get("qrcode")} alt="" />
    </div>
  );
};

export default TwoFAValidation;
