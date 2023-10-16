import React from 'react'
import DefaultHeader from '../components/Headers/DefaultHeader'
import WorkspacesIcon from '@mui/icons-material/Workspaces';

const Profile = () => {
    return (
        <>
            <DefaultHeader name={"Back to Workspace"} icon={<WorkspacesIcon />} />
        </>
    )
}

export default Profile