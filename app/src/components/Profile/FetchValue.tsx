import Cookies from "js-cookie";

// route: The Nest route for the path
// setCallBack: the React useState function that will change the element calling this
export const fetchText = async (route: string, setCallBack: Function) => {
  const res = await fetch("http://localhost:3030/" + route, {
    credentials: "include",
    headers: {
      Authorization: `bearer ${Cookies.get("jwtToken")}`,
    },
  });
  // const data = await res.text();
  setCallBack(await res.text());
};

export const fetchObject = async (route: string, setCallBack?: Function) => {
  const res = await fetch("http://localhost:3030/" + route, {
    credentials: "include",
    headers: {
      Authorization: `bearer ${Cookies.get("jwtToken")}`,
    },
  });
  const data = await res.json();
  if (setCallBack){
    setCallBack(data);
  }
};
