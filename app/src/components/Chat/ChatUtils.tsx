import axios from "axios";
import Cookies from "js-cookie";

export async function getChannels(setChannels: any, setPublic: any) {
  await axios
    .get("http://localhost:3030/chat/channels", {
      withCredentials: true,
      headers: {
        Authorization: `bearer ${Cookies.get("jwtToken")}`,
      },
    })
    .then((res) => {
      setChannels(res.data);
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
      setPublic(res.data);
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

export async function joinChannel(
  channelID: number,
  setUserChannels: any,
  setPublic: any
) {
  let ret_value = true;
  await axios
    .post(
      "http://localhost:3030/chat/join-channel",
      {
        value: channelID,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `bearer ${Cookies.get("jwtToken")}`,
        },
      }
    )
    .then((res) => {
      if (res.data === true) {
        getChannels(setUserChannels, setPublic);
        console.log("Channel joined");
      }
      if (res.data === false) {
        ret_value = false;
      }
    })
    .catch((error) => {
      alert(error);
    });
  return ret_value;
}

export async function joinPassword(
  channelID: number,
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>
) {
  setTrigger(true);
  console.log("IN PASSWORD");
}
