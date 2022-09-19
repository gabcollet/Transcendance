import { useState } from 'react';
import { fetchValue } from './FetchValue';

/*
** Must be passed the following props:
** username: The 42 username of the profile which we fetch
** className: The css module class for styling purposes
*/
export const UserLosses = (props: any) => {
    const [userLosses, setUserLosses] = useState('');
    fetchValue('users/' + props.username + '/losses', setUserLosses);
    return (
      <h3 className={props.className}>L: {userLosses}</h3>
    );
  }