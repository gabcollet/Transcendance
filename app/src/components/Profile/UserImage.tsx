import { useState } from 'react';
import { fetchValue } from './FetchValue';

/*
** Must be passed the following props:
** userName: The 42 username of the profile which we fetch
** className: The css module class for styling purposes
*/
export const UserImage = (props: any) => {
    const [userImage, setUserImage] = useState('');
    fetchValue('img', props.userName, setUserImage);
    return (
      <img className={props.className} src={userImage} alt="" />
    );
  }