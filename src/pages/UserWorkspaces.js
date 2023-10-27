import React from 'react'
import DefaultHeader from '../components/Headers/DefaultHeader'
import LogoutIcon from '@mui/icons-material/Logout';
import UserWorkspacesMain from '../components/Main/UserWorkspacesMain';

const UserWorkspaces = () => {
    return (
        <>
            <DefaultHeader name={"Logout"} icon={<LogoutIcon/>} location={"/"} />
            <UserWorkspacesMain />
        </>
    )
}

export default UserWorkspaces