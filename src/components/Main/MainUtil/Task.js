import {useState} from 'react'

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import swapElements from '../../../utility/swapElements';

const Task = (props) => {
    const {taskId, name, description, position} = props.task;
    const {doRenderTasks, tasks, setTasks} = props
    const [title, setTitle] = useState(name)
    const [desc, setDesc] = useState(description)
    const [syncState, setSyncState] = useState(false)

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleDescChange = (event) => {
        setDesc(event.target.value)
    }

    const handleShiftUp = () => {
        if (position === tasks[0].position){
            return
        }
        if (!syncState){
            setSyncState(true)
            const thisIndex = tasks.findIndex(task => task.position === position)
            const prevPos = tasks[thisIndex-1].position
            swapElements(tasks, thisIndex, prevPos, thisIndex-1, position)
            setTasks([...tasks])
            updateTaskOrder(prevPos).then(setSyncState(false))
        }
    }

    const handleShiftDown = () => {
        if (position === tasks[tasks.length-1].position){
            return
        }
        if (!syncState){
            setSyncState(true)
            const thisIndex = tasks.findIndex(task => task.position === position)
            const nextPos = tasks[thisIndex+1].position
            swapElements(tasks, thisIndex, nextPos, thisIndex+1, position)
            setTasks([...tasks])
            updateTaskOrder(nextPos).then(setSyncState(false))
        }
    }

    const updateTaskOrder = async (newPos) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: title, position: newPos, description: desc})
        }
        await fetch(`http://localhost:4000/tasks/${taskId}`, requestOptions)
    }

    const updateTask = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: title, position: position, description: desc})
        }
        await fetch(`http://localhost:4000/tasks/${taskId}`, requestOptions)
    }

    const deleteTask = async () => {
        const requestOptions = {
            method: 'DELETE',
        }
        await fetch(`http://localhost:4000/tasks/${taskId}`, requestOptions)
    }

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        updateTask()
        doRenderTasks()
        setAnchorEl(null);
    };

    const handleDelete = () => {
        deleteTask()
        doRenderTasks()
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const popId = open ? 'simple-popover' : undefined;

    return (
        <>
            <ListItem 
                key={taskId}
                className='list-item'
                secondaryAction={
                    <>
                        <IconButton edge="end" aria-label="shift-up" onClick={handleShiftUp}>
                            <KeyboardArrowUpIcon fontSize='small'/>
                        </IconButton>
                        <IconButton edge="end" aria-label="shift-down" onClick={handleShiftDown}>
                            <KeyboardArrowDownIcon fontSize='small'/>
                        </IconButton>
                    </>
                }
            >
                <ListItemText
                    primary={name}
                    secondary= {
                        description ?
                        <SpeakerNotesIcon fontSize='small' /> :
                        <SpeakerNotesOffIcon fontSize='small'/>
                        }
                    className='list-item-text'
                    onClick={handleClick}
                />
            </ListItem>
            <Popover
                id={popId}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Paper elevation={3} sx={{p: 1, display:'flex', alignItems: 'center', justifyContent:'center'}}>
                    <TextField id="outlined-basic-1" label="Title" value={title} multiline variant="outlined" sx={{m:0.5}} onChange={handleTitleChange}/>
                    <TextField id="outlined-basic-2" label="Description" value={desc?desc:''} multiline variant="outlined" sx={{m:0.5}} onChange={handleDescChange}/>
                    <Fab onClick={handleDelete} color='success' variant='extended' aria-label="delete" sx={{m:0.5, backgroundColor: "#00A36C"}}>
                        Delete
                    </Fab>
                </Paper>
            </Popover>
        </>
    )
}

export default Task