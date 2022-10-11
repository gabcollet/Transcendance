import { MouseEventHandler } from "react";
import React from "react";
import { Socket, io } from "socket.io-client";
import { Settings } from "http2";

export interface Username_ {
  username: string;
  member: boolean;
  admin: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  channelTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChatChannels_ {
  userChannels: any;
  setUserChannels: any;
  setPublic: any;
  publicChannels: any;
  setRoomID: React.Dispatch<React.SetStateAction<number>>;
  currentID: number;
  socket: Socket<any, any> | undefined;
  setSocket: React.Dispatch<React.SetStateAction<Socket<any, any> | undefined>>;
  setJoinedAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChatBubble_ {
  message: string;
  author: string;
}

export interface Channel_ {
  title: string;
  id: number;
  joined: boolean;
  setUserChannels: any;
  setPublic: any;
  setRoomID: React.Dispatch<React.SetStateAction<number>>;
  currentID: number;
  socket: Socket<any, any> | undefined;
  setSocket: React.Dispatch<React.SetStateAction<Socket<any, any> | undefined>>;
  setPasswordTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordID: React.Dispatch<React.SetStateAction<number>>;
  isDM: boolean;
  setOwnerTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  ownerTrigger: boolean;
  setJoinedAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChannelDB_ {
  chatroom: {
    channelName: string;
    id: number;
    isDM: boolean;
    password: string; // to remove
    private: boolean;
    protected: boolean;
  };
}
export interface ChatInput_ {
  sendMsg: (message: string) => void;
}

export interface MenuButton_ {
  onClick?: MouseEventHandler<HTMLLIElement>;
  icon: any;
  className: string;
  iconClassName: string;
}

export interface Toggle_ {
  icon: any;
  onClick: MouseEventHandler<HTMLDivElement>;
  className: string;
}

export interface Menu_ {
  opening: boolean;
  setOpening: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MenuWheel_ {
  opening: boolean;
  setOpening: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChatFriend_ {}

export interface Chat_ {
  userName: string;
  id: number;
}

export interface AddPopup_ {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  userChannels: any;
  setUserChannels: any;
  setPublic: any;
}

export interface Message_ {
  author: string;
  msg: string;
  chatRoom: number;
}

export interface InputZone_ {
  setMessages: React.Dispatch<React.SetStateAction<Message_[]>>;
  messages: Message_[];
  chatRoom: number;
  socket: Socket<any, any> | undefined;
  setSocket: React.Dispatch<React.SetStateAction<Socket<any, any> | undefined>>;
}

export interface MessageWindow_ {
  messages: Message_[];
  chatRoom: number;
  setMessages: React.Dispatch<React.SetStateAction<Message_[]>>;
}

export interface PasswordPopup_ {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  channelID: number;
  setUserChannels: any;
  setPublic: any;
}

export interface OwnerPopup_ {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  channelID: number;
}

export interface ChatFriendList_ {
  friends: string[];
  setFriends: React.Dispatch<React.SetStateAction<string[]>>;
  username: string;
  setRoomId: React.Dispatch<React.SetStateAction<number>>;
  channelTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserPopup_ {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  isAdmin: boolean;
  currentRoom: number;
  setMembers: React.Dispatch<React.SetStateAction<string[]>>;
}
