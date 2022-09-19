import { useState } from 'react';
import { fetchValue } from './FetchValue';

/*
** Must be passed the following props:
** userName: The 42 username of the profile which we fetch
** className: The css module class for styling purposes
*/
export const UserDisplayName = (props: any) => {
    const [displayName, setDisplayName] = useState('');
    fetchValue('users/' + props.username + '/displayname', setDisplayName);
    return (
        <p className={props.className}>{displayName}</p>
    );
  }