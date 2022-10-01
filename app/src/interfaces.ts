import { MouseEventHandler } from "react";
import React from "react";
import { AxiosResponse } from "axios";
export interface ChatChannels_ {
  userChannels: any;
  setUserChannels: any;
}

export interface ChatBubble_ {
  message: string;
}

export interface Channel_ {
  title: string;
  id: number;
  joined: boolean;
  setUserChannels: any;
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
}

export interface AddPopup_ {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  userChannels: any;
  setUserChannels: any;
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
}

export interface MessageWindow_ {
  messages: Message_[];
  chatRoom: number;
}
