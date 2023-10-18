import React from 'react'

import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import Task from './Task';

const Tasklist = (props) => {
    const {id, title} = props.item

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
        <div className='list-container-column'>
            <List 
                key={id}
                className='list'
                subheader={
                    <div className='list-header'>
                        <TextField 
                            className='header-text'
                            variant="standard" 
                            inputProps={{style: { textAlign: 'center', fontSize: 18 }}}
                            defaultValue={title}
                        />
                        <IconButton edge="end" aria-label="shift-left">
                                <NavigateBeforeIcon fontSize='small'/>
                        </IconButton>
                        <IconButton edge="end" aria-label="shift-right">
                                <NavigateNextIcon fontSize='small'/>
                        </IconButton>
                    </div>
                }
            >
                {
                    listItem.map((item) =>{
                        return <Task item={item}/>
                    })
                }
                <IconButton edge="end" aria-label="add-list-item" className='list-item-add'>
                    <AddIcon />
                </IconButton>
            </List>
            <IconButton edge="end" aria-label="clear-list" className='list-clear'>
                <ClearIcon />
            </IconButton>
        </div>
    )
}

export default Tasklist