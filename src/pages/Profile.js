import React, { useContext } from 'react'
import DefaultHeader from '../components/Headers/DefaultHeader'
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import ProfileMain from '../components/Main/ProfileMain';
import DataContext from '../DataContext';

const Profile = () => {
    const {user} = useContext(DataContext)

    return (
        user &&
        <>
            <DefaultHeader name={"Back to Workspace"} icon={<WorkspacesIcon />} />
            <ProfileMain email={user.email} password={user.password} displayname={user.displayName}/>
        </>
    )
}

export default Profile