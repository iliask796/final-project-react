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
import swapElements from '../../../utility/swapElements'

const Tasklist = (props) => {
    const {tasklistId, name, position} = props.list
    const {tasklists, setTasklists} = useContext(DataContext)
    const [tasks, setTasks] = useState(null)
    const [title, setTitle] = useState(name)
    const [newTitle, setNewTitle] = useState('')
    const [newDesc, setNewDesc] = useState('')
    const [syncState, setSyncState] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const popId = open ? 'simple-popover' : undefined;

    const updateTasklist = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: title, position: position})
        }
        await fetch(`http://localhost:4000/tasklists/${tasklistId}` , requestOptions)
    }

    const updateTasklistOrder = async (newPos) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: title, position: newPos})
        }
        await fetch(`http://localhost:4000/tasklists/${tasklistId}`, requestOptions)
    }

    const deleteTasklist = async () => {
        const requestOptions = {
            method: 'DELETE',
        }
        await fetch(`http://localhost:4000/tasklists/${tasklistId}`, requestOptions)
    }

    const createTask = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: newTitle?newTitle:'New Task', position: tasks.length!==0?(tasks[tasks.length-1].position)+1:1, description: newDesc?newDesc:null})
        }
        await fetch(`http://localhost:4000/tasklists/${tasklistId}/tasks` , requestOptions).then(
            response => response.json()).then(
                dataSet => {
                    if (dataSet.status === 'success'){
                        tasks.push(dataSet.data)
                        setTasks([...tasks])
                    }
                }
            )
    }
    
    async function getTasks() {
        const url = 'http://localhost:4000/tasklists/'+ tasklistId +'/tasks'
        const response = await fetch(url)
        const json = await response.json()
        if (json.status === 'success'){
            setTasks([...json.data])
        }
    }

    useEffect(() => {
        if (tasklistId != null){
            getTasks()
        }
    })

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleLeftShift = () => {
        if (position === tasklists[0].position){
            return
        }
        if (!syncState){
            setSyncState(true)
            const thisIndex = tasklists.findIndex(list => list.position === position)
            const prevPos = tasklists[thisIndex-1].position
            swapElements(tasklists, thisIndex, prevPos, thisIndex-1, position)
            setTasklists([...tasklists])
            updateTasklistOrder(prevPos).then(setSyncState(false))
        }
    }

    const handleRightShift = () => {
        if (position === tasklists[tasklists.length-1].position){
            return
        } 
        if (!syncState){
            setSyncState(true)
            const thisIndex = tasklists.findIndex(list => list.position === position)
            const nextPos = tasklists[thisIndex+1].position
            swapElements(tasklists, thisIndex, nextPos, thisIndex+1, position)
            setTasklists([...tasklists])
            updateTasklistOrder(nextPos).then(setSyncState(false))
        }
    }

    const handleCreate = () => {
        createTask().then(() => {
            setNewTitle('')
            setNewDesc('')
            setAnchorEl(null);
        })
    }

    const handleDelete = () => {
        const deleteIndex = tasklists.findIndex(list => list.tasklistId === tasklistId)
        tasklists.splice(deleteIndex,1)
        setTasklists([...tasklists])
        deleteTasklist()
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setNewTitle('')
        setNewDesc('')
        setAnchorEl(null);
    };

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
                        return <Task key={task.taskId} task={task} tasks={tasks} setTasks={setTasks}/>
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