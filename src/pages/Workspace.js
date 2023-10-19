import React, { useContext } from 'react'
import WorkspaceHeader from '../components//Headers/WorkspaceHeader'
import WorkspaceMain from '../components/Main/WorkspaceMain'
import DataContext from '../DataContext'

const Workspace = () => {
    const { user, workspace } = useContext(DataContext)

    return (
        workspace &&
        <>
            <WorkspaceHeader projectName={workspace.name} dueDate={workspace.dueDate} displayname={user.displayName}/>
            <WorkspaceMain />
        </>
    )
}

export default Workspace