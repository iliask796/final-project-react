import React from 'react'
import DefaultHeader from '../components/Headers/DefaultHeader'
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import ProfileMain from '../components/Main/ProfileMain';

const Profile = () => {
    return (
        <>
            <DefaultHeader name={"Back to Workspace"} icon={<WorkspacesIcon />} />
            <ProfileMain email={"ilias@email.com"} password={1234} displayname={"Ilias Kal"}/>
        </>
    )
}

export default Profile