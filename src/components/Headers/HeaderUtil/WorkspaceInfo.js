import React, { useContext, useState } from 'react'
import convertDate from '../../../utility/convertDate'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import DataContext from '../../../utility/DataContext';

const WorkspaceInfo = () => {
    const {id} = useParams()
    const {workspace, setWorkspace, listOfWorkspaces, setListOfWorkspaces} = useContext(DataContext)
    const [Lock, setLock] = useState(true)
    const [editMode, setEditMode] = useState(false)

    const updateProject = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: workspace.name, startDate:workspace.startDate?convertDate(workspace.startDate):null, endDate: workspace.endDate?convertDate(workspace.endDate):null})
        }
        await fetch(`http://localhost:4000/workspaces/${id}`, requestOptions)
    }

    const handleEditStart = () => {
        setLock(false)
        setEditMode(true)
    }

    const handleEditDone = () => {
        const thisIndex = listOfWorkspaces.findIndex(thisWorkspace => thisWorkspace.workspaceId === workspace.workspaceId)
        listOfWorkspaces[thisIndex] = {
            workspaceId: workspace.workspaceId,
            name: workspace.name,
            startDate: workspace.startDate,
            endDate: workspace.endDate
        }
        updateProject().then(() => {
            setListOfWorkspaces([...listOfWorkspaces])
            setLock(true)
            setEditMode(false)
        })
    }

    return (
        <div className='workspace-info'>
            <Paper className='project' sx={{p:0.75}}>
                <TextField 
                    label = 'Title' 
                    variant="outlined" 
                    value={workspace.name} 
                    disabled={Lock} 
                    size='Normal' 
                    onChange={(event) => setWorkspace({...workspace,name:event.target.value})}
                    className='project-name'
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        className='project-date'
                        label={"Start Date"} 
                        sx = {{svg: {color: '#0F52BA'}}}
                        value={workspace.startDate?dayjs(workspace.startDate):dayjs()}
                        disabled={Lock}
                        onChange={(newDate) => setWorkspace({...workspace, startDate: newDate})}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        className='project-date'
                        label={"End Date"} 
                        sx = {{svg: {color: '#0F52BA'}}}
                        value={workspace.endDate?dayjs(workspace.endDate):dayjs()}
                        disabled={Lock}
                        onChange={(newDate) => setWorkspace({...workspace, endDate: newDate})}
                    />
                </LocalizationProvider>
                {
                    !editMode &&
                        <IconButton onClick={handleEditStart} edge="end" aria-label="edit" sx={{m:0.5}} className='project-action'>
                            <EditIcon />
                        </IconButton>
                }
                {
                    editMode &&
                        <IconButton onClick={handleEditDone} edge="end" aria-label="edit" sx={{m:0.5}} className='project-action'>
                            <DoneIcon />
                        </IconButton>
                }
            </Paper>
        </div>
    )
}

export default WorkspaceInfo