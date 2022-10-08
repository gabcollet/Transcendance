import { getCardMediaUtilityClass } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { Message_ } from "../../interfaces";
import { fetchObject } from "../Profile/FetchValue";

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

export async function getChatMembers(roomID: number) {
  let members: any;
  let result = await axios
    .get("http://localhost:3030/chat/members", {
      params: {
        id: roomID,
      },
      withCredentials: true,
      headers: {
        Authorization: `bearer ${Cookies.get("jwtToken")}`,
      },
    })
    .then((response) => {
      members = response.data;
    });
  return members;
}

export async function isAdminRequest(chatRoom: number, username: string) {
  let isAdmin = false;
  await axios
    .get("http://localhost:3030/chat/is-admin", {
      params: {
        id: chatRoom,
        username: username,
      },
      withCredentials: true,
      headers: {
        Authorization: `bearer ${Cookies.get("jwtToken")}`,
      },
    })
    .then((res) => {
      isAdmin = res.data;
    });
  return isAdmin;
}

export async function getChatRequest(
  setMessages: React.Dispatch<React.SetStateAction<Message_[]>>,
  setMembers: React.Dispatch<React.SetStateAction<string[]>>,
  roomId: number,
  profileName: string,
  setFriends: React.Dispatch<React.SetStateAction<any[]>>
) {
  axios
    .get("http://localhost:3030/chat/convo", {
      params: {
        id: roomId,
      },
      withCredentials: true,
      headers: {
        Authorization: `bearer ${Cookies.get("jwtToken")}`,
      },
    })
    .then((response) => {
      setMessages(response.data);
    });
  axios
    .get("http://localhost:3030/chat/members", {
      params: {
        id: roomId,
      },
      withCredentials: true,
      headers: {
        Authorization: `bearer ${Cookies.get("jwtToken")}`,
      },
    })
    .then((response) => {
      setMembers(response.data);
    });
  axios
    .get("http://localhost:3030/chat/friends", {
      withCredentials: true,
      headers: {
        Authorization: `bearer ${Cookies.get("jwtToken")}`,
      },
    })
    .then((response) => {
      setFriends(response.data);
    });
}

export async function getDM(
  target: string,
  trigger: React.Dispatch<React.SetStateAction<boolean>>
) {
  let retId: number;
  axios
    .get("http://localhost:3030/chat/dm", {
      params: {
        target: target,
      },
      withCredentials: true,
      headers: {
        Authorization: `bearer ${Cookies.get("jwtToken")}`,
      },
    })
    .then((res) => {
      trigger(true);
    });
  return true;
}
