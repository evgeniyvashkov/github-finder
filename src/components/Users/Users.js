import React from 'react';

import Spinner from '../Layout/Spinner';
import UserItem from './UserItem';

const Users = ({ loading, users }) => {
    if (loading) {
        return <Spinner />
    } else {
        return (
            <div className="users__list" style={styleUsersComponent}>
                {users.map(user => <UserItem key={user.id} user={user} />)}
            </div>
        )
    }
}

const styleUsersComponent = {
    display: "grid",
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap: "1rem"
}

export default Users
