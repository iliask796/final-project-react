import React from 'react'
import WorkspaceHeader from '../components//Headers/WorkspaceHeader'
import WorkspaceMain from '../components/Main/WorkspaceMain'

const Workspace = () => {
    return (
        <>
            <WorkspaceHeader projectName={"Project Management Tool"} dueDate={"10-31-2023"} displayname={"Ilias Kal"}/>
            <WorkspaceMain />
        </>
    )
}

export default Workspace