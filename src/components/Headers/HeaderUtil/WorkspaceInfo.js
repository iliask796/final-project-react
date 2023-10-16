import React, { useState } from 'react'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

const WorkspaceInfo = (props) => {
    const [textLock, setTextLock] = useState(true)
    const [editMode, setEditMode] = useState(false)

    const handleEditStart = () => {
        setTextLock(false)
        setEditMode(true)
    }

    const handleEditDone = (event) => {
        event.preventDefault();
        setTextLock(true)
        setEditMode(false)
    }

    return (
        <div className='workspace-info'>
            <Paper className='project-name'>
                <TextField component="form" variant="outlined" defaultValue={props.title} disabled={textLock} size='Normal' onSubmit={handleEditDone} className='project-name-info'/>
                {
                    !editMode &&
                        <EditIcon className='project-name-action' onClick={handleEditStart}/>
                }
                {
                    editMode &&
                        <DoneIcon className='project-name-action' onClick={handleEditDone}/>
                }
            </Paper>
            <div className='project-date'>
                <Typography variant='h6'>Due Date:</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker defaultValue={dayjs(props.date)} className='project-date-box'/>
                </LocalizationProvider>
            </div>
        </div>
    )
}

export default WorkspaceInfo