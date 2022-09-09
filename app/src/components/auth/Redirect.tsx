import { Link } from "react-router-dom";

const genRandStr = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charLength));
  }

  return result;
};

const url: string =
  "https://api.intra.42.fr/oauth/authorize?client_id=" +
  "3187aa6aec15b19df251d4424b7bc8f7fc761603b4bae21e049ce800e217a812" +
  "&redirect_uri=" +
  "http%3A%2F%2Flocalhost%3A3030%2Fauth%2Flogin" +
  "&response_type=code" +
  "&state=" +
  genRandStr(12);

const Redirect = (): any => {
  return (
    <div>
      <Link className="link" to="/auth/login"></Link>
      <>{window.location.replace(url)}</>
    </div>
  );
};

export default Redirect;
