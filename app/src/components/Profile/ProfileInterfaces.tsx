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
