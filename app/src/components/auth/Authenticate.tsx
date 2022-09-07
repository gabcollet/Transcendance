import { FunctionComponent, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Authenticate = () => {
  const [query, setQuery] = useSearchParams();
  let code = query.get("code");

  console.log("Authorization Code = " + code);

  useEffect(() => {
    if (code) {
      axios
        .get("http://localhost:3030/api/auth?code=" + code)
        .then((response) => {
          console.log(response);
          console.log(response.headers);
          console.log(response.headers["set_cookie"]);
        });
    }
  });
  return <> </>;
};

export default Authenticate;
