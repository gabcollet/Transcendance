import { MouseEventHandler } from "react";
import React from "react";

export interface ChatChannels_ {
  userChannels: number[];
  setUserChannels: React.Dispatch<React.SetStateAction<number[]>>;
}

export interface ChatBubble_ {
  message: string;
  key: number;
}

export interface Channel_ {
  title: string;
  joined: boolean;
}

export interface ChatInput_ {
  sendMsg: (message: string) => void;
}

export interface InputZone_ {
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
  messages: string[];
  chatRoom: number;
}

export interface MessageWindow_ {
  messages: string[];
  chatRoom: number;
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
}
