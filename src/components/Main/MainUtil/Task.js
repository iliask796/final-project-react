import React from 'react'

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';

const Task = (props) => {
    const {id, title, description} = props.item

    return (
        <ListItem 
            key={id}
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
                primary={title}
                secondary= {
                    description ?
                    <SpeakerNotesIcon fontSize='small' /> :
                    <SpeakerNotesOffIcon fontSize='small'/>
                    }
                className='list-item-text'
            />
        </ListItem>
    )
}

export default Task