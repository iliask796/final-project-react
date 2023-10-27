import React, { useContext } from 'react'
import WorkspaceHeader from '../components//Headers/WorkspaceHeader'
import WorkspaceMain from '../components/Main/WorkspaceMain'
import DataContext from '../utility/DataContext'
import DefaultHeader from '../components/Headers/DefaultHeader'
import LogoutIcon from '@mui/icons-material/Logout';

const Workspace = () => {
    const { user, workspace } = useContext(DataContext)

    return (
        workspace?
        <>
            <WorkspaceHeader displayname={user.displayName}/>
            <WorkspaceMain />
        </>
        : <DefaultHeader name={"Logout"} icon={<LogoutIcon/>} location={"/"} />
    )
}

export default Workspace