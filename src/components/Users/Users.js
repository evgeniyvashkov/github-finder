import React, { Fragment } from 'react';

import Spinner from '../Layout/Spinner';
import UserItem from './UserItem';
import Search from './Search'



const Users = ({ loading, users }) => {
    if(loading) {
        return <Spinner />
    } else {
        return users.map(user => <UserItem key={user.id} user={user} />)
    }
}
    // <div className="users container" style={styleUsersComponent}>
        {/* <Search /> */}
        // {loading ? <Spinner /> : users.map(user => <UserItem key={user.id} user={user} />)}

    // </div>


export default Users
