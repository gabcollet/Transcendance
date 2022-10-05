import { RefObject } from "react";

// Props types
export interface FriendCardProps {
  onRemove?: Function;
  friendUsername: string | undefined;
  searchString?: string;
}

export interface ProfileProps {
  username: string | undefined;
}

export interface FetchedComponentProps {
  username: string | undefined;
  className?: string;
}

export interface SpecificContentProps {
  contentType: string;
  username: string | undefined;
}

export interface UsersListProps {
  searchString: string;
}

export interface FriendButtonProps {
  onRemove?: Function;
  friendUsername?: string;
}

// UseState types
export interface User {
  id?: number;
  username?: string;
  displayname?: string;
  intraId?: string;
  picture?: string;
  wins?: number;
  losses?: number;
  status?: string;
  twoFAEnabled?: boolean;
  twoFASecret?: string;
}

export interface Stats {
  id?: number;
  wins?: number;
  losses?: number;
  netWins?: number;
  winningStreak?: number;
  losingStreak?: number;
  username?: string;
}
