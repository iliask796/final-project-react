import '../../stylesheets/workspace-list.css'
import { IconButton, List, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import DataContext from '../../utility/DataContext'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import WorkspaceListItem from './MainUtil/WorkspaceListItem';

const UserWorkspacesMain = () => {
    const {user, listOfWorkspaces, setListOfWorkspaces} = useContext(DataContext)
    const [syncState, setSyncState] = useState(false)
    
    const createWorkspace = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"name": "New Workspace"})
        }
        await fetch(`http://localhost:4000/users/1/workspaces` , requestOptions).then(
            response => response.json()).then(
                dataSet => {
                    if (dataSet.status === 'success'){
                        listOfWorkspaces.push(dataSet.data)
                        setListOfWorkspaces([...listOfWorkspaces])
                    }
                }
            )
    }

    const handleAdd = () => {
        if (!syncState){
            setSyncState(true)
            createWorkspace().then(setSyncState(false))
        } 
    }

    return (
        user &&
        listOfWorkspaces &&
        <div className='workspaces-container'>
            <Typography variant='h3' sx={{marginTop:'30px'}}>
                Welcome
            </Typography>
            <Typography variant='h4'>
                {user.displayName}
            </Typography>
            <List className='workspace-list'>
                {
                    listOfWorkspaces.map((workspace) => {
                        return <WorkspaceListItem key={workspace.workspaceId} workspace={workspace}/>
                    })
                }
                {
                    (listOfWorkspaces.length < 5) &&
                    <IconButton edge="end" aria-label="add-workspace" sx={{placeSelf:'center'}} onClick={handleAdd}>
                        <AddCircleOutlineIcon fontSize='large' sx={{color:'#0F52BA'}}/>
                    </IconButton>
                }
            </List>
        </div>
    )
}

export default UserWorkspacesMain