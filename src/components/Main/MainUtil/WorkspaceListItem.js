import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { IconButton, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DataContext from '../../../utility/DataContext';

const WorkspaceListItem = (props) => {
    const {workspace} = props
    const navigate = useNavigate()
    const {listOfWorkspaces, setListOfWorkspaces, currentWorkspaceId, setCurrentWorkspaceId} = useContext(DataContext)
    const labelId = `${workspace.workspaceId}`

    const deleteWorkspace = async () => {
        const requestOptions = {
            method: 'DELETE',
        }
        await fetch(`http://localhost:4000/workspaces/${workspace.workspaceId}`, requestOptions)
    }

    const handleDelete = () => {
        const thisIndex = listOfWorkspaces.findIndex(thisWorkspace => thisWorkspace.workspaceId === workspace.workspaceId)
        deleteWorkspace().then(() => {
            listOfWorkspaces.splice(thisIndex,1)
            setListOfWorkspaces([...listOfWorkspaces])
        })
    }

    const handleNavigate = () => {
        setCurrentWorkspaceId(workspace.workspaceId)
        navigate("/workspace/"+workspace.workspaceId)
    }

    return (
        <ListItem
            key={workspace.workspaceId}
            sx={{height:'20%'}}
            secondaryAction={
            <IconButton edge="end" aria-label="remove-workspace" onClick={handleDelete}>
                <RemoveCircleOutlineIcon fontSize='large' sx={{color:'#0F52BA'}}/>
            </IconButton>
            }
            disablePadding
        >
            <ListItemButton role={undefined} sx={{height:'100%', borderRadius:'20px'}} dense onClick={handleNavigate}>
                <ListItemText id={labelId} primary={
                    <Typography variant='h5'>
                        {workspace.name}
                    </Typography>
                } />
            </ListItemButton>
        </ListItem>
    )
}

export default WorkspaceListItem