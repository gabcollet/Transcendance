import { getCardMediaUtilityClass } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { Socket } from "socket.io-client";
import { Message_ } from "../../interfaces";
import { fetchObject } from "../Profile/FetchValue";
import { setCustom } from "../../Pages/PongRoom";
import { roomID } from "../Menu/useCanvas";

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
  setPublic: any,
  socket: any
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
      socket?.emit("leaveRoom", { chatRoom: channelID });
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
  let ret_value = "";
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
      ret_value = res.data;
      if (res.data === "connected") {
        getChannels(setUserChannels, setPublic);
        console.log("Channel joined");
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
  if (chatRoom && username) {
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
  return false;
}

export async function giveAdmin(chatRoom: number, username: string) {
  console.log(username);
  console.log(chatRoom);
  if (chatRoom && username) {
    await axios
      .post(
        "http://localhost:3030/chat/give-admin",
        {
          chatroom: chatRoom,
          username: username,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `bearer ${Cookies.get("jwtToken")}`,
          },
        }
      )
      .then((res) => {
        console.log("RESPONSE FROM GIVE : " + res.data);
      });
  }
}

export async function restrictUser(
  username: string,
  chatroom: number,
  time: number,
  type: string
) {
  console.log(username + " " + chatroom + " " + time + " " + type);
  const restrict = await axios
    .post(
      "http://localhost:3030/chat/ban-mute",
      {
        chatroom: chatroom,
        username: username,
        time: time,
        type: type,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `bearer ${Cookies.get("jwtToken")}`,
        },
      }
    )
    .then((res) => {
      console.log("USER RESTRICTED");
    });
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
  let retId = await axios.get("http://localhost:3030/chat/dm", {
    params: {
      target: target,
    },
    withCredentials: true,
    headers: {
      Authorization: `bearer ${Cookies.get("jwtToken")}`,
    },
  });
  trigger(true);
  return Number(retId.data);
}

export async function clickChannel(
  currentID: number,
  newID: number,
  setRoom: React.Dispatch<React.SetStateAction<number>>,
  socket: any
) {
  socket?.emit("leaveRoom", { chatRoom: currentID });
  socket?.emit("joinRoom", { chatRoom: newID });
  setRoom(newID);
}

export async function isMutedBlocked(author: string, roomID: number) {
  const result = await axios.get("http://localhost:3030/chat/is-restricted", {
    params: {
      author: author,
      chatroom: roomID,
    },
    withCredentials: true,
    headers: {
      Authorization: `bearer ${Cookies.get("jwtToken")}`,
    },
  });
  if (result.data === true) {
    return true;
  } else {
    return false;
  }
}

export async function isOwner(
  roomID: number,
  setOwner: React.Dispatch<React.SetStateAction<boolean>>
) {
  const ownership = await axios.get("http://localhost:3030/chat/is-owner", {
    params: {
      chatroom: roomID,
    },
    withCredentials: true,
    headers: {
      Authorization: `bearer ${Cookies.get("jwtToken")}`,
    },
  });
  setOwner(ownership.data);
  return ownership.data;
}

export function invitePlay(username: string) {
  setCustom(null).then((roomID) => {
    //get the username of second player
    //pull socketID from DB using username
    //send signal to second player
    //second player get popup that onClic call "setCustom(roomID)"
    //and <Link to="/Pong"></Link>
    console.log(roomID);
  });
}
