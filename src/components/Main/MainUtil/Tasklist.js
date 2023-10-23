import { useContext, useEffect, useState } from 'react'

import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import Task from './Task';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import DataContext from '../../../DataContext';

const Tasklist = (props) => {
    const {tasklistId, name, position} = props.list
    const {doRenderTasklists} = useContext(DataContext)
    const [renderTasks, setRenderTasks] = useState(0)
    const [tasks, setTasks] = useState(null)

    const doRenderTasks = () => {
        setRenderTasks(renderTasks + 1)
    }

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
    },[renderTasks])

    const [title, setTitle] = useState(name)
    const [pos, setPos] = useState(position)

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleLeftShift = () => {

    }

    const handleRightShift = () => {

    }

    const updateTasklist = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: title, position: pos})
        }
        await fetch(`http://localhost:4000/tasklists/${tasklistId}` , requestOptions)
    }

    const deleteTasklist = async () => {
        const requestOptions = {
            method: 'DELETE',
        }
        await fetch(`http://localhost:4000/tasklists/${tasklistId}`, requestOptions)
    }

    const handleDelete = () => {
        deleteTasklist()
        doRenderTasklists()
    }

    const [newTitle, setNewTitle] = useState('')
    const [newDesc, setNewDesc] = useState('')

    const createTask = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: newTitle?newTitle:'New Task', position: tasks.length+1, description: newDesc?newDesc:''})
        }
        await fetch(`http://localhost:4000/tasklists/${tasklistId}/tasks` , requestOptions)
    }

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setNewTitle('')
        setNewDesc('')
        setAnchorEl(null);
    };

    const handleCreate = () => {
        createTask()
        doRenderTasks()
        setNewTitle('')
        setNewDesc('')
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const popId = open ? 'simple-popover' : undefined;

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
                            value={title}
                            onChange={handleTitleChange}
                            onBlur={updateTasklist}
                        />
                        <IconButton edge="end" aria-label="shift-left" onClick={handleLeftShift}>
                                <NavigateBeforeIcon fontSize='small'/>
                        </IconButton>
                        <IconButton edge="end" aria-label="shift-right" onClick={handleRightShift}>
                                <NavigateNextIcon fontSize='small'/>
                        </IconButton>
                    </div>
                }
            >
                {
                    tasks &&
                    tasks.map((task) =>{
                        return <Task key={task.taskId} task={task} doRenderTasks={doRenderTasks}/>
                    })
                }
                <IconButton edge="end" aria-label="add-list-item" className='list-item-add' onClick={handleClick}>
                    <AddIcon />
                </IconButton>
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
                        <TextField id="outlined-basic-1" label="Title" value={newTitle} onChange={(event) => setNewTitle(event.target.value)} multiline variant="outlined" sx={{m:0.5}}/>
                        <TextField id="outlined-basic-2" label="Description" defaultValue={newDesc} onChange={(event) => setNewDesc(event.target.value)} multiline variant="outlined" sx={{m:0.5}}/>
                        <Fab onClick={handleCreate} color='success' variant='extended' aria-label="delete" sx={{m:0.5, backgroundColor: "#00A36C"}}>
                            Create
                        </Fab>
                    </Paper>
                </Popover>
            </List>
            <IconButton edge="end" aria-label="clear-list" className='list-clear' onClick={handleDelete}>
                <ClearIcon />
            </IconButton>
        </div>
    )
}

export default Tasklist