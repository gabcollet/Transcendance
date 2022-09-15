import { useState } from 'react';
import { fetchValue } from './FetchValue';

/*
** Must be passed the following props:
** - userName: The 42 username of the profile which we fetch.
** - className: The css module class for styling purposes.
*/
export const UserStatus = (props: any) => {
    const [status, setStatus] = useState('');
    fetchValue('status', props.userName, setStatus);
    return (
        <p className={props.className}>Status: {status}</p>
    );
  }