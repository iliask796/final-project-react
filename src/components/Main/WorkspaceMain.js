import React from 'react'
import '../../stylesheets/workspace.css'

import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import AddIcon from '@mui/icons-material/Add';

const WorkspaceMain = () => {
    const list = [
        {
            id: 1,
            title: 'To-Do'
        },
        {
            id: 2,
            title: 'Doing'
        },
        {
            id: 3,
            title: 'Done'
        }
    ]

    const listItem = [
        {
            id: 1,
            title: 'First List Item',
            description: 'a'
        },
        {
            id: 2,
            title: 'Second List Item',
            description: 'b'
        },
        {
            id: 3,
            title: 'Third List Item',
            description: null
        }
    ]

    return (
        <div className='workspace'>
            <div className='list-container'>
                {
                    list.map((item) => 
                    <List 
                        key={item.id}
                        className='list'
                        subheader={
                            <div className='list-header'>
                                <TextField 
                                    className='header-text'
                                    variant="standard" 
                                    inputProps={{style: { textAlign: 'center', fontSize: 18 }}}
                                    defaultValue={item.title}/>
                                <IconButton edge="end" aria-label="shift-left">
                                        <NavigateBeforeIcon fontSize='small'/>
                                </IconButton>
                                <IconButton edge="end" aria-label="shift-right">
                                        <NavigateNextIcon fontSize='small'/>
                                </IconButton>
                            </div>
                        }
                    >
                        {listItem.map((item) =>
                            <ListItem 
                                key={item.id}
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
                                    primary={item.title}
                                    secondary= {
                                        item.description ?
                                        <SpeakerNotesIcon fontSize='small' /> :
                                        <SpeakerNotesOffIcon fontSize='small'/>
                                    }
                                    className='list-item-text'
                                />
                            </ListItem>
                        )}
                        <IconButton edge="end" aria-label="add-list-item" className='list-item-add'>
                            <AddIcon />
                        </IconButton>
                    </List>
                )
                }
                <IconButton edge="end" aria-label="add-list" className='list-add'>
                        <AddIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default WorkspaceMain