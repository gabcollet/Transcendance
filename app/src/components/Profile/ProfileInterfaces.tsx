// Props types
export interface FriendCardProps {
  friendUsername: string;
  searchString?: string;
}

export interface ProfileProps {
  username: string;
}

export interface FetchedComponentProps {
  username: string;
  className?: string;
}

export interface SpecificContentProps {
  contentType: string;
  username: string;
}

export interface UsersListProps {
  searchString: string;
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
