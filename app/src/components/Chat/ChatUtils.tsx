import axios from "axios";
import Cookies from "js-cookie";

export async function getChannels(setChannels: any, setPublic: any) {
  await axios
    .get("http://localhost:3030/chat/get-channels", {
      withCredentials: true,
      headers: {
        Authorization: `bearer ${Cookies.get("jwtToken")}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      setChannels(res.data);
      console.log("Channels list generated");
    })
    .catch((error) => {
      console.log(error);
    });
  await axios
    .get("http://localhost:3030/chat/public-channels", {
      withCredentials: true,
      headers: {
        Authorization: `bearer ${Cookies.get("jwtToken")}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      setPublic(res.data);
      console.log("Channels list generated");
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function removeChannel(
  channelID: number,
  setUserChannels: any,
  setPublic: any
) {
  await axios
    .post(
      "http://localhost:3030/chat/delete-channel",
      { value: channelID },
      {
        withCredentials: true,
        headers: {
          Authorization: `bearer ${Cookies.get("jwtToken")}`,
        },
      }
    )
    .then((res) => {
      getChannels(setUserChannels, setPublic);
    })
    .catch((error) => {
      alert(error);
    });
}