import { useLocation } from "react-router-dom";

export default function SignIn(): any {
  let location = useLocation();

  let from: any = location.state;
  if (!from) from = { from: { pathname: "/" } };
  console.log(from);

  const url: string =
    "https://api.intra.42.fr/oauth/authorize?client_id=" +
    "3187aa6aec15b19df251d4424b7bc8f7fc761603b4bae21e049ce800e217a812" +
    "&redirect_uri=" +
    "http%3A%2F%2Flocalhost%3A3000%2FMenu" +
    "&response_type=code" +
    "&state=" +
    from["from"]["pathname"];

  return (
    <div>
      <>{window.location.replace(url)}</>
    </div>
  );
}
