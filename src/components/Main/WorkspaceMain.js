import React from 'react'
import '../../stylesheets/workspace.css'

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tasklist from './MainUtil/Tasklist';

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

    return (
        <div className='workspace'>
            <div className='list-container'>
                {
                    list.map((item) => {
                        return <Tasklist key={item.id} item={item}/>
                    })
                }
                <IconButton edge="end" aria-label="add-list" className='list-add'>
                        <AddIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default WorkspaceMain