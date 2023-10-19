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
    const {taskId, name, description} = props.task;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        handleClose();
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
                        <IconButton edge="end" aria-label="shift-left">
                            <NavigateBeforeIcon className='this-button'/>
                        </IconButton>
                        <IconButton edge="end" aria-label="shift-right">
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
                <Paper elevation={3} sx={{p: 1}}>
                    <TextField id="outlined-basic-1" label="Title" defaultValue={name} variant="outlined" sx={{m:0.5}}/>
                    <TextField id="outlined-basic-2" label="Description" defaultValue={description} variant="outlined" sx={{m:0.5}}/>
                    <Fab onClick={handleDelete} color='success' variant='extended' aria-label="delete" sx={{m:0.5, backgroundColor: "#00A36C"}}>
                        Delete
                    </Fab>
                </Paper>
            </Popover>
        </>
    )
}

export default Task