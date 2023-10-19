import { useEffect, useState } from 'react'

import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import Task from './Task';

const Tasklist = (props) => {
    const {tasklistId, name} = props.list
    const [tasks, setTasks] = useState(null)

    async function getTasks() {
        const url = 'http://localhost:4000/tasklists/'+ tasklistId +'/tasks'
        const response = await fetch(url)
        const json = await response.json()
        if (json.status === 'success'){
            setTasks(json.data)
        }
    }

    useEffect(() => {
        if (tasklistId != null){
            getTasks()
        }
    },[])

    return (
        <div className='list-container-column'>
            <List 
                key={tasklistId}
                className='list'
                subheader={
                    <div className='list-header'>
                        <TextField 
                            className='header-text'
                            variant="standard" 
                            inputProps={{style: { textAlign: 'center', fontSize: 18 }}}
                            defaultValue={name}
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
                    tasks &&
                    tasks.map((task) =>{
                        return <Task key={task.taskId} task={task}/>
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