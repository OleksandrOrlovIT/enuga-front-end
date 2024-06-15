import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import EditUser from "../user/EditUser";

const ProfileForm = () => {
    const { user, logout } = useContext(AuthContext);
    return <EditUser user={user} onSuccess={logout}/>
};

export default ProfileForm;