import React, { useContext } from 'react'
import '../../stylesheets/workspace.css'

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tasklist from './MainUtil/Tasklist';
import DataContext from '../../DataContext';

const WorkspaceMain = () => {
    const { tasklists } = useContext(DataContext)

    return (
        tasklists &&
        <div className='workspace'>
            <div className='list-container'>
                {
                    tasklists.map((list) => {
                        return <Tasklist key={list.tasklistId} list={list}/>
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