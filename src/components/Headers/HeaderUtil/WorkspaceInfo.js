import React, { useState } from 'react'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
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
            <Paper className='project-name' sx={{p:0.75}}>
                <TextField component="form" variant="outlined" defaultValue={props.title} disabled={textLock} size='Normal' onSubmit={handleEditDone} className='project-name-info'/>
                {
                    !editMode &&
                        <IconButton onClick={handleEditStart} edge="end" aria-label="edit" sx={{m:0.5}} className='project-name-action'>
                            <EditIcon />
                        </IconButton>
                }
                {
                    editMode &&
                        <IconButton onClick={handleEditDone} edge="end" aria-label="edit" sx={{m:0.5}} className='project-name-action'>
                            <DoneIcon />
                        </IconButton>
                }
            </Paper>
            <Paper className='project-date' sx={{p:0.75}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        label={"Due Date"} 
                        defaultValue={dayjs(props.date)} 
                        className='project-date-box'
                        sx = {{svg: {color: '#0F52BA'}}}
                    />
                </LocalizationProvider>
            </Paper>
        </div>
    )
}

export default WorkspaceInfo