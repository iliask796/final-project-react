import React, { useEffect, useState } from 'react'
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

const WorkspaceInfo = (props) => {
    const [title, setTitle] = useState(props.title)
    const [Lock, setLock] = useState(true)
    const [editMode, setEditMode] = useState(false)
    const [date, setDate] = useState(props.date?dayjs(props.date):dayjs())

    const updateProject = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: title, dueDate: convertDate(date)})
        }
        await fetch('http://localhost:4000/workspaces/3', requestOptions)
    }
    
    const handleEditStart = () => {
        setLock(false)
        setEditMode(true)
    }

    const handleEditDone = () => {
        setLock(true)
        setEditMode(false)
        updateProject()
    }

    return (
        <div className='workspace-info'>
            <Paper className='project' sx={{p:0.75}}>
                <TextField 
                    label = 'Title' 
                    variant="outlined" 
                    value={title} 
                    disabled={Lock} 
                    size='Normal' 
                    onChange={(event) => {setTitle(event.target.value)}} 
                    className='project-name'/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        className='project-date'
                        label={"Due Date"} 
                        sx = {{svg: {color: '#0F52BA'}}}
                        value={date}
                        disabled={Lock}
                        onChange={(newDate) => {setDate(newDate)}}
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