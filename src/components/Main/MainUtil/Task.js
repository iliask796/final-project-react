import {useState} from 'react'

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';

const Task = (props) => {
    const {taskId, name, description, position} = props.task;
    const {doRenderTasks} = props

    const [title, setTitle] = useState(name)
    const [desc, setDesc] = useState(description)
    const [pos, setPos] = useState(position)

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleDescChange = (event) => {
        setDesc(event.target.value)
    }

    const handleLeftShift = () => {

    }

    const handleRightShift = () => {
        
    }

    const updateTask = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: title, position: pos, description: desc})
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
                        <IconButton edge="end" aria-label="shift-left" onClick={handleLeftShift}>
                            <NavigateBeforeIcon className='this-button'/>
                        </IconButton>
                        <IconButton edge="end" aria-label="shift-right" onClick={handleRightShift}>
                            <NavigateNextIcon />
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