import { useState } from 'react';
import { fetchValue } from './FetchValue';

/*
** Must be passed the following props:
** userName: The 42 username of the profile which we fetch
** className: The css module class for styling purposes
*/
export const UserWins = (props: any) => {
    const [userWins, setUserWins] = useState('');
    fetchValue('wins', props.userName, setUserWins);
    return (
      <h3 className={props.className}>W: {userWins}</h3>
    );
  }