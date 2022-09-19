import { useState } from 'react';
import { fetchText } from './FetchValue';

/*
** Must be passed the following props:
** username: The 42 username of the profile which we fetch
** className: The css module class for styling purposes
*/
export const UserImage = (props: any) => {
    const [userImage, setUserImage] = useState('');
    fetchText('users/' + props.username + '/img', setUserImage);
    return (
      <img className={props.className} src={userImage} alt="" />
    );
  }